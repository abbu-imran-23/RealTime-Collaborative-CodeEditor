import React, { useState} from "react";
// import { useLocation } from "react-router-dom";
import Client from "../components/Client";
import CodeEditor from "../components/CodeEditor";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Editor = () => {

    const navigate = useNavigate();
    const [clientList, setClientList] = useState([
        {
            socketId: 1,
            username: "Imran Pasha"
        },
        {
            socketId: 2,
            username: "Roshan Ameen"
        },
        {
            socketId: 3,
            username: "Amarjeet"
        },
        {
            socketId: 4,
            username: "Suraj Gurjar"
        }
    ]);

    const { roomId } = useParams();
    const copyRoomId = () => {
        navigator.clipboard.writeText(roomId)
        .then(() => toast.success("Copied Room Id"))
        .catch((error) => {
            console.log(error);
            toast.error("Failed to Copy");
        })
    }

//   const location = useLocation();
//   const { username } = location.state;

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
      <CodeEditor/>
    </div>
  );
};

export default Editor;
