import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import userReducer from './users'
import postReducer from './posts'


const store = configureStore({
    reducer: {
        auth: authReducer,
        users:userReducer,
        posts: postReducer
    }
})

export default store;