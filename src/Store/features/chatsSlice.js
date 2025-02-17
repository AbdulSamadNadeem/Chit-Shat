import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    connectedchats:[],
    allusers:[],
    selectedchat:null,
    messages:[]
}

export const chatSlice = createSlice({
    name:'chats',
    initialState,
    reducers:{
        allchats:(state , {payload})=>{
                  state.connectedchats = payload
        },
        allusers:(state, {payload})=>{
           state.allusers = payload
        },
        selectChat:(state ,{payload})=>{
            state.selectedchat = payload
        },
    }
})

export const {allchats , allusers , selectChat} = chatSlice.actions
export default chatSlice.reducer