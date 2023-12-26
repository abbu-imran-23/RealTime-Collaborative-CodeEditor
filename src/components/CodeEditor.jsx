import React, { useRef, useEffect } from 'react'
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';

const CodeEditor = () => {

  const textAreaRef = useRef();

  useEffect(() => {
    const codeMirrorInstance = CodeMirror.fromTextArea(textAreaRef.current, {
      lineNumbers: true,
      theme: 'dracula',
      mode: 'javascript',
      autoCloseTags: true, 
      autoCloseBrackets: true,
    });

    // Adjust the height of the CodeMirror instance
    codeMirrorInstance.setSize('100%', '100vh');

    codeMirrorInstance.on('change', (editor) => {
      // Get the updated code and handle changes if needed
      const newCode = editor.getValue();
      // Do something with the updated code, like updating state
      console.log('Updated code:', newCode);
    });

    return () => {
      // Cleanup CodeMirror instance
      codeMirrorInstance.toTextArea();
    };
    
  })

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