import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const AllUsers=async()=>{
  const res=await axios.get("http://localhost:7005/user")
  return res.data;
}

export const getAllUsers =createAsyncThunk("users",AllUsers);

const userSlice= createSlice({
      name:"user",
      initialState:{users:[],loading:false},
      extraReducers:(builder)=>{
        builder.addCase(
          getAllUsers.fulfilled,(state,action)=>{
            state.users=action.payload;
          }
        )
        builder.addCase(
          getAllUsers.pending,(state,action)=>{
            state.loading=true;
          }
        )
        builder.addCase(
          getAllUsers.rejected,(state,action)=>{
            state.users=[];
          }
        )
      }
})

export default userSlice.reducer;
