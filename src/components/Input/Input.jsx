import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { StartChat } from "../../API/RouteHandlers";
import { selectChat } from "../../Store/features/chatsSlice";
import toast from "react-hot-toast";

const Input = () => {
  const allusers = useSelector((state) => state?.chatreducer?.allusers);
  const connectedChat = useSelector(
    (state) => state?.chatreducer?.connectedchats
  );
  const user = useSelector((state) => state?.authreducer?.user);
  const [search, setSearch] = useState("");
  const [flteruser, setfilteruser] = useState([]);
  const dispatch = useDispatch();

  const handleSearch = () => {
    const findusers = allusers.filter((users) =>
      users.username.toLowerCase().includes(search.toLowerCase())
    );
    setfilteruser(findusers);
  };

  const startChat = async (id) => {
    const members = [user?._id, id];
    await StartChat("/chat/startchat", { members });

    const findselecteduser = connectedChat.find((users) => {
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
    <>
      <div>
        <div className="flex items-center p-4">
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search"
            className="w-96 h-12 rounded-lg shadow-blue-200 shadow-md text-2xl font-light text-gray-500 pl-10 outline-none"
          />
          <CiSearch
            onClick={handleSearch}
            className="text-4xl font-light text-gray-500 relative right-96 hover:scale-110 duration-200"
          />
        </div>

        {flteruser.length === 0 ? null : (
          <div className="w-96 ml-4 bg-white shadow-lg rounded-2xl p-6 max-h-[400px] overflow-y-auto">
            {flteruser.map((user) => (
              <div
                key={user?._id}
                className="flex justify-between items-center gap-4 mb-4 p-4 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all"
              >
                <h1 className="text-2xl font-medium text-blue-600">
                  {user.username}
                </h1>
                <button
                  onClick={() => startChat(user?._id)}
                  className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all"
                >
                  Start Chat
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Input;
