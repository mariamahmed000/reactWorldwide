import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: {},
  token: null,
  posts: [],
  urlString: "/",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUrl: (state, action) => {
      state.urlString = action.payload;
    },
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    //could make the setLogin contain prepare function and the lgoin function to prepare the action to have to parameters passed, however we will just pass the parameters inside an object as one parameter
    setLogin: (state, action) => {
      state.user = action.payload.data;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = {};
      state.token = null;
      state.posts = [];
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("No friends for the user.");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export default authSlice.reducer;
export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setPosts,
  setPost,
  setUrl,
} = authSlice.actions;
