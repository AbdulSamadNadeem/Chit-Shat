import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import Input from "../../components/Input/Input";
import { io } from "socket.io-client";
import Connecteduser from "../../components/ConnectedUser/Connecteduser";
import Chatroom from "components/Chatroom/Chatroom";

const Home = () => {
  const socket = io("http://127.0.0.1:3000");
  const user = useSelector((state) => state?.authreducer?.user);
  const selected = useSelector((state) => state?.chatreducer?.selectedchat);
  useEffect(() => {
    socket.emit("join-room", user?._id);
  }, [selected]);
  return (
    <div>
      <Header />
      <div className="flex">
        <div className="flex flex-col gap-10">
          <Input />
          <Connecteduser />
        </div>
        {selected && <Chatroom socket={socket} />}
      </div>
    </div>
  );
};

export default Home;
