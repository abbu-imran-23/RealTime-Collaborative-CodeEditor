import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const createRoomId = (e) => {
    e.preventDefault();
    const newRoomId = uuid();
    setRoomId(newRoomId);
    console.log(newRoomId);
    toast.success("New Room Created!");
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("RoomId and Username are required");
      return;
    }
    navigate(`/editor/${roomId}`, {
      state: {
        username,
      },
    });
    toast.success(`Happy Coding ${username}`);
  };

  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };

  return (
    <>
      <div className="bg-slate-800 h-screen w-screen flex flex-col justify-center items-center">
        <div className="bg-slate-900 px-5 py-8 w-1/3 rounded-md flex flex-col gap-3">
          <img height={120} width={125} src="/logo.png" alt="logo" />
          <h4 className="text-white text-xl text-opacity-85">
            Paste Invitation{" "}
            <span className="text-green-600 font-semibold">ROOM ID</span>
          </h4>
          <div className="flex flex-col gap-2">
            <input
              className="rounded-sm text-opacity-80 text-[1.15rem] bg-slate-600 outline-none px-2 py-1 text-white"
              placeholder="ROOM ID"
              type="text"
              name=""
              id=""
              value={roomId}
              onChange={(e) => {
                setRoomId(e.target.value);
              }}
            />
            <input
              className="rounded-sm text-opacity-80 text-[1.15rem] bg-slate-600 outline-none px-2 py-1 text-white"
              placeholder="USERNAME"
              type="text"
              name=""
              id=""
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              onKeyUp={handleInputEnter}
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={joinRoom}
              className="text-white text-opacity-95 px-4 py-1 bg-green-900 rounded-md text-[1.15rem]"
            >
              Join
            </button>
          </div>
          <h5 className="text-white text-center text-[1.15rem] text-opacity-85">
            Don't have invite, create{" "}
            <span
              onClick={createRoomId}
              className="text-green-600 hover:text-green-500  font-semibold cursor-pointer"
            >
              new room
            </span>
          </h5>
        </div>
        <div className="relative top-52">
          <h4 className="text-white text-center text-[1.15rem] text-opacity-85">
            Built with Passion &#x2764; by{" "}
            <span className="text-green-600 hover:text-green-500 font-semibold">
              Imran Pasha
            </span>
          </h4>
        </div>
      </div>
    </>
  );
};

export default Home;
