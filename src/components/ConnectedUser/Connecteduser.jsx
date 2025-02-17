import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectChat } from "../../Store/features/chatsSlice";

const Connecteduser = () => {
  const friends = useSelector((state) => state?.chatreducer?.connectedchats);
  const user = useSelector((state) => state?.authreducer?.user);
  const members = friends.flatMap((chat) => chat.members);
  const dispatch = useDispatch();
 
  const filter_duplicate = Array.from(
    new Map(members.map((m) => [m._id, m])).values()
  );
  const chats = filter_duplicate.filter((chat) => chat._id !== user._id);
  const startChat = async (id) => {
    const findselecteduser = friends.find((users) => {
      return (
        users.members.some((item) => item._id.includes(id)) &&
        users.members.some((item) => item._id.includes(user?._id))
      );
    });
    if (findselecteduser) {
      dispatch(selectChat(findselecteduser));
    } else {
      toast.error("something went wrong");
    }
  };
  return (
    <div className="w-96 ml-4 bg-white shadow-md rounded-2xl p-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Connected Chats</h2>
      <ul className="space-y-4">
        {chats.map((chat) => (
          <li
            onClick={() => startChat(chat._id)}
            key={chat._id}
            className="flex flex-col bg-gray-50 p-3 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <p className="text-gray-900 font-semibold">{chat.username}</p>
            <p className="text-gray-500 text-sm">{chat.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Connecteduser;
