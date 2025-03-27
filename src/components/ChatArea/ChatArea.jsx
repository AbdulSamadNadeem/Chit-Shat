import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {useSelector } from "react-redux";
import { getAllmessages, sendMessage } from "../../API/RouteHandlers";

const ChatArea = ({socket}) => {

  const [message, setMessage] = useState("");
  const [allmessage, setallMessage] = useState([]);
  const [typing, settyping] = useState(false);
  const selected = useSelector((state) => state?.chatreducer?.selectedchat);
  const user = useSelector((state) => state?.authreducer?.user);
  const chat = selected?.members?.find((item) => item._id !== user._id);

  const sendMessageData = async () => {
    try {
      const messageData = {
        chatID: selected?._id,
        sender: user?._id,
        text: message,
      };
      socket.emit('send-message' , {
        ...messageData,
        members:selected.members.map(m=> m._id),
        read:false,
        createdAt:Date.now()
      })
      const newMessage = await sendMessage("/chat/sendmessage", messageData);
      if (newMessage) {
        setMessage("");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  const fetchAllmessages = async () => {
    try {
      const allmessages = await getAllmessages(
        `/chat/getallmessages/${selected?._id}`
      );
      const allmegs = allmessages?.data?.allmessages;
      setallMessage(allmegs)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
   
    if (selected?._id) {
      fetchAllmessages();
    }
    socket.on('receive-message'  , (data)=>{
      setallMessage((prev) => [...prev , data] , )
    })
    socket.on('started' , (data)=>{
      if(selected._id === data.chatID && data.sender !== user._id){
        settyping(true)
        setTimeout(()=>{
              settyping(false)
        },2000)
      }
    })
  }, [selected?._id]);
  return (
    <div className="w-full h-[800px] bg-gray-50 py-6 px-4 flex flex-col my-6 mr-6">
      <div className="border-b-2 border-gray-500 pb-4 mb-4">
        <h1 className="text-2xl font-light text-left">{chat?.username}</h1>
        {typing && (<h1 className="text-sm font-light text-gray-800">typing</h1>)}
      </div>

      <div className="flex-1 overflow-y-auto border rounded-lg bg-white shadow-sm p-4 space-y-4">
        {allmessage?.length === 0 ? (
          <p className="text-gray-500 text-center">No messages yet.</p>
        ) : (
          <>
            {allmessage
              ?.slice()
              .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
              .map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    msg.sender === user?._id ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`${
                      msg.sender === user?._id
                        ? "text-right bg-green-100"
                        : "text-left bg-blue-100"
                    } p-3 rounded-lg max-w-md shadow`}
                  >
                    {msg?.text || "No content"}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {new Date(msg?.createdAt).getHours()}:
                    {new Date(msg?.createdAt).getMinutes()}
                  </p>
                </div>
              ))}
          </>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <input
          type="text"
          value={message}
          placeholder="Type your message..."
          onChange={(e) => {setMessage(e.target.value)
            socket.emit('typing' , {
              chatID:selected._id,
              members:selected.members.map(m=> m._id),
              sender:user._id
            })
          }
        }
          className="flex-1 h-12 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <button
          onClick={() => sendMessageData()}
          className="bg-blue-500 text-white h-12 w-12 rounded-full flex justify-center items-center hover:bg-blue-600 shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatArea;

