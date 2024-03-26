import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import store from "./redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
      integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
      crossOrigin="anonymous"
      referrerPolicy="no-referrer"
    />
    <GoogleOAuthProvider clientId="76813673774-1541ajvgfshij6dhnfs5168sditi17tv.apps.googleusercontent.com">
      <Provider store={store}>
      <App />
      </Provider>

    </GoogleOAuthProvider>

  </React.StrictMode>
);
