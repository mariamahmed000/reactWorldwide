import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const AllUsers = async () => {
  const res = await axios.get("https://node-react-project-1.onrender.com/user");
  return res.data;
};

export const getAllUsers = createAsyncThunk("users", AllUsers);

export const getUserById = createAsyncThunk("userId", async (id) => {
  const res = await axios.get(
    `https://node-react-project-1.onrender.com/user/${id}`
  );
  return res.data;
});

const userSlice = createSlice({
  name: "user",
  initialState: { users: [], loading: false },
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(getAllUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllUsers.rejected, (state) => {
      state.users = [];
    });
    builder.addCase(getUserById.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(getUserById.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getUserById.rejected, (state, action) => {
      state.users = [];
    });
  },
});

export default userSlice.reducer;
