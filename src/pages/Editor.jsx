import React, { useEffect, useRef, useState} from "react";
import Client from "../components/Client";
import CodeEditor from "../components/CodeEditor";
import { useParams, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate, Navigate } from "react-router-dom";
import ACTIONS from "../Actions";
import { initSocket } from "../Socket";

const Editor = () => {
  
  const socketRef = useRef(null);
  const codeChangeRef = useRef(null);
  const location = useLocation();
  const homeNavigate = useNavigate();
  const navigate = useNavigate();
  const [clientList, setClientList] = useState([]);
  const { roomId } = useParams();

    useEffect(() => {
      const init = async() => {
        socketRef.current = await initSocket();

        socketRef.current.on('connect_error', (err) => handleError(err));
        // socketRef.current.on('connect_failed', (err) => handleError(err));

        const handleError = (err) => {
          console.log("Socket Error ", err);
          toast.error("Socket Connection failed, please try again");
          homeNavigate("/");
        }

        socketRef.current.emit(ACTIONS.JOIN, {
          roomId,
          username: location.state?.username
        });

        // Listening for JOINED Event
        socketRef.current.on(ACTIONS.JOINED, 
          ({ clients, username, socketId }) => {
            if(username !== location.state?.username) {
              toast.success(`${username} joined the room`);
            }
            setClientList(clients);
            socketRef.current.emit(ACTIONS.SYNC_CODE, {
              code: codeChangeRef.current,
              socketId
            })
        })

        // Listening for DISCONNECTED Event
        socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
          toast.success(`${username} left the room`);
          setClientList((prev) => {
            return prev.filter(client => client.socketId !== socketId);
          })
        })

      }
      init();

      // Cleaning Function
      return () => {
        socketRef.current.disconnect();
        socketRef.current.off(ACTIONS.JOINED);
        socketRef.current.off(ACTIONS.DISCONNECTED);
      }

    }, []);

    // Copy Room Id
    const copyRoomId = () => {
        navigator.clipboard.writeText(roomId)
        .then(() => toast.success("Copied Room Id"))
        .catch((error) => {
            console.log(error);
            toast.error("Failed to Copy");
        })
    };

    if(!location.state) {
      <Navigate to="/"/>
    }

  return (
    <div className="flex flex-row bg-slate-800 h-screen w-screen ">
      <div className="bg-slate-900 w-1/6 h-screen flex flex-col justify-between">
        <div className="flex flex-col justify-start items-center gap-3">
          <div>
            <img
              src="/logo.png"
              height={100}
              width={105}
              alt="logo"
              className="mt-4"
            />
          </div>
          <span className="h-1 w-5/6 rounded-sm bg-slate-500"></span>
          <div>
            <h4 className="text-white text-xl">Connected</h4>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-2">
            {
                clientList.map((client) => {
                    return (
                        <Client key={client.socketId} username={client.username}/>
                    )
                })
            }
          </div>
        </div>
        <div className="flex flex-col justify-center items-center pb-6 gap-3 text-white">
          <button
          onClick={copyRoomId} 
          className="bg-green-900 px-4 rounded-md py-1 ">
            Copy Room Id
          </button>
          <button
          onClick={() => {
            navigate("/");
            toast.success("Exited from Room");
          }} 
          className="bg-red-900 px-8 rounded-md py-1">Exit Room</button>
        </div>
      </div>
      <CodeEditor socketRef={socketRef} roomId={roomId} onCodeChange={(code) => {
        codeChangeRef.current = code;
      }}/>
    </div>
  );
};

export default Editor;
