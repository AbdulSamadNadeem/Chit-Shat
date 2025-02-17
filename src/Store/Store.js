import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./features/userSlice";
import { chatSlice } from "./features/chatsSlice";

export const store = configureStore({
    reducer:{
       authreducer: userSlice.reducer,
       chatreducer: chatSlice.reducer
    }
})