import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import Input from "../../components/Input/Input";
import { io } from "socket.io-client";
import Connecteduser from "../../components/ConnectedUser/Connecteduser";

import ChatArea from "../../components/ChatArea/ChatArea";


const Home = () => {
  const socket = io("https://backend-for-chat-app.vercel.app", {
    transports: ["websocket"],
    withCredentials: true,
  });
  const user = useSelector((state) => state?.authreducer?.user);
  const selected = useSelector((state) => state?.chatreducer?.selectedchat);
  useEffect(() => {
    socket.emit("join-room", user?._id);
    socket.on('connect_error', (error) => {
    console.error('Connection error:', error);
});
  }, [selected]);
  return (
    <div>
      <Header />
      <div className="flex">
        <div className="flex flex-col gap-10">
          <Input />
          <Connecteduser />
        </div>


        {selected && <ChatArea socket={socket} />}

      </div>
    </div>
  );
};

export default Home;
