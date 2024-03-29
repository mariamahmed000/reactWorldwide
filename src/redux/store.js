import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./users";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

export const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
// const persistedUsersReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    // users: persistedUsersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
