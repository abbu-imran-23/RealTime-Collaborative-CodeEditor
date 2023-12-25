import React from "react";

const Home = () => {
  return (
    <>
      <div className="bg-slate-800 h-screen w-screen flex flex-col justify-center items-center">
        <div className="bg-slate-900 px-5 py-8 w-1/3 rounded-md flex flex-col gap-3">
          <img height={120} width={125} src="/logo.png" alt="logo"/>
          <h4 className="text-white text-xl text-opacity-85">
            Paste Invitation{" "}
            <span className="text-green-600 font-semibold">ROOM ID</span>
          </h4>
          <div className="flex flex-col gap-2">
            <input
              className="rounded-sm text-opacity-85 text-[1.15rem] bg-slate-600 outline-none px-2 py-1 text-white"
              placeholder="ROOM ID"
              type="text"
              name=""
              id=""
            />
            <input
              className="rounded-sm text-opacity-85 text-[1.15rem] bg-slate-600 outline-none px-2 py-1 text-white"
              placeholder="USERNAME"
              type="text"
              name=""
              id=""
            />
          </div>
          <div className="flex justify-end">
            <button className="text-white text-opacity-95 px-4 py-1 bg-green-900 rounded-md text-[1.15rem]">
              Join
            </button>
          </div>
          <h5 className="text-white text-center text-[1.15rem] text-opacity-85">
            Don't have invite, create{" "}
            <span className="text-green-600 font-semibold cursor-pointer">
              new room
            </span>
          </h5>
        </div>
        <div className="relative top-60">
          <h4 className="text-white text-center text-[1.15rem] text-opacity-85">
            Built with passion by{" "}
            <span className="text-green-600 font-semibold">Imran</span>
          </h4>
        </div>
      </div>
    </>
  );
};

export default Home;
