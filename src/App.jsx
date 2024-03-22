import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { themeSettings } from "./themes";
import { useMemo } from "react";
import HomePage from "./pages/HomePage";

function App() {
  const theme = useMemo(() => createTheme(themeSettings("light")), []);
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/home" element={<HomePage />}></Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
