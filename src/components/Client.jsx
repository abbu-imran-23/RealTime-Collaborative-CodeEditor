import React from "react";
import Avatar from "react-avatar";

const Client = ({ username}) => {

  const firstName = username.split(" ").at(0);

  return (
    <div className="flex flex-col justify-center items-center gap-1">
      <Avatar name={username} size="50" round="8px"/>
      <span className="text-white text-center">{firstName}</span>
    </div>
  );
};

export default Client;
