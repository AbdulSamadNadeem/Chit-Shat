import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import {
  getAllChats,
  getAllUserData,
  getUserDetailsById,
} from "../../API/RouteHandlers";
import { useDispatch } from "react-redux";
import { logedinuser } from "../../Store/features/userSlice";
import { allchats, allusers } from "../../Store/features/chatsSlice";

const ProtectRoutes = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const FecthData = async () => {
    if (!token) {
      navigate("/");
      return;
    }

    try {
      const user = await getUserDetailsById("/getuserdata");
      dispatch(logedinuser(user))

      const allUsers = await getAllUserData("/getAlluserdata");
      dispatch(allusers(allUsers))

      const Chats = await getAllChats("/chat/getallchats");
      dispatch(allchats(Chats))
       navigate('/home')
    } catch (err) {
      console.error("Error fetching data:", err);
      navigate("/");
    }
  };

  useEffect(() => {
    FecthData();
  }, [token]);

  return <div>{children}</div>;
};

export default ProtectRoutes;
