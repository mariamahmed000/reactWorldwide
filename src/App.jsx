import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { themeSettings } from "./themes";
import { useMemo } from "react";
import HomePage from "./pages/homePage/HomePage";
import ProfilePage from "./pages/profilePage/ProfilePage";
import Login from "./pages/loginPage/Login";
import Register from "./pages/regPage/Register";
import ErrorPage from "./pages/errorPage/errorPage";
import Navbar from "./components/navbar/navbar";
import { Provider, useSelector } from "react-redux";
import store from "./redux/store";

function App() {
  
  return (
    <div className="app">
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Navbar></Navbar>
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/profile/:userId" element={<ProfilePage />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/reg" element={<Register />}></Route>
              <Route path="*" element={<ErrorPage />}></Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
