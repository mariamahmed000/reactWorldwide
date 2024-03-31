import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const AllPosts = async () => {
  const res = await axios.get(
    "https://node-react-project-1.onrender.com/allposts"
  );
  return res.data;
};

export const getAllPosts = createAsyncThunk("posts", AllPosts);

const postSlice = createSlice({
  name: "posts",
  initialState: { users: [], loading: false },
  extraReducers: (builder) => {
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    builder.addCase(getAllPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllPosts.rejected, (state) => {
      state.posts = [];
    });
  },
});

export default postSlice.reducer;
