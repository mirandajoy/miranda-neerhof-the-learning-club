import React from "react";
import ReactDOM from "react-dom/client";
import LoginContextProvider from "./components/LoginContextProvider/LoginContextProvider";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoginContextProvider>
      <App />
    </LoginContextProvider>
  </React.StrictMode>
);
