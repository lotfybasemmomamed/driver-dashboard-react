import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import WindowContextProvider from "./context/WindowContext.jsx";
import MenuBarProvider from "./context/MenuBarContext.jsx";

import "./index.css";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <WindowContextProvider>
      <MenuBarProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </MenuBarProvider>
    </WindowContextProvider>
  </BrowserRouter>
);
