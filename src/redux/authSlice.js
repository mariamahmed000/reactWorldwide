import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import persistConfig from "./reduxPersist";

const initialState = {
  mode: "light",
  user: {},
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    //could make the setLogin contain prepare function and the lgoin function to prepare the action to have to parameters passed, however we will just pass the parameters inside an object as one parameter
    setLogin: (state, action) => {
      
      state.user = action.payload.data;
      // console.log(state.user);
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("No friends for the user.");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post_id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

const persistedReducer = persistReducer(persistConfig, authSlice.reducer);

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;
export default persistedReducer; // Export the persisted reducer
