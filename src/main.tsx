import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { ToastContainer } from "react-toastify";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ToastContainer 
          position="top-center"
          draggable={true}
          pauseOnFocusLoss={false}
        />
      <App />
    </BrowserRouter>
  </StrictMode>
);
