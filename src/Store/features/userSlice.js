import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:{}
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        logedinuser:(state , {payload})=>{
              state.user = payload
        }
    }
})

export const {logedinuser} = userSlice.actions

export default userSlice.reducer