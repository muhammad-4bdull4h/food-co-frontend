import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Router } from "react-router-dom";
import { StorecontextProvider } from "./context/storeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <StorecontextProvider>
        <App />
      </StorecontextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
