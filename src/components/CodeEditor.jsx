import React, { useRef, useEffect } from 'react'
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import ACTIONS from '../Actions';

const CodeEditor = ({ socketRef, roomId, onCodeChange }) => {

  const textAreaRef = useRef();
  const editorRef = useRef();

  useEffect(() => {
    function init() {
      const codeMirrorInstance = CodeMirror.fromTextArea(textAreaRef.current, {
        lineNumbers: true,
        theme: 'dracula',
        mode: 'javascript',
        autoCloseTags: true, 
        autoCloseBrackets: true,
      });
  
      editorRef.current = codeMirrorInstance;
  
      // Adjust the height of the CodeMirror instance
      codeMirrorInstance.setSize('100%', '100vh');
  
      codeMirrorInstance.on('change', (editor) => {
        // Get the updated code and handle changes if needed
        const newCode = editor.getValue();
        // Do something with the updated code, like updating state
        console.log('Updated code:', newCode);
      });

      editorRef.current.on('change', (instance, changes) => {
        console.log("Changes", changes);
        const { origin } = changes;
        const code = instance.getValue();
        onCodeChange(code);
        if(origin !== 'setValue') {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code
          });
        }  
      })
  
      return () => {
        // Cleanup CodeMirror instance
        codeMirrorInstance.toTextArea();
      };

    }

    init();

    // eslint-disable-next-line
  },[])

  useEffect(() => {
    if(socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if(code !== null) {
          editorRef.current.setValue(code);
        }
      })
    }

    return () => {
      socketRef.off(ACTIONS.CODE_CHANGE);
    }

  }, [socketRef]);

  return (
    <div className='w-5/6 px-1 h-screen text-[1.35rem]'>
      <textarea
        ref={textAreaRef} 
        className='w-5/6 h-screen outline-none px-2 py-1 bg-slate-800 caret-white text-2xl'
        id='codeEditor'>
      </textarea>
    </div>
  )
}

export default CodeEditor