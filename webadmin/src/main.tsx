import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes";
import Theme from "./contexts/Theme";
import User from "./contexts/User";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <User>
      <Theme>
        <RouterProvider router={router} />
      </Theme>
    </User>
  </React.StrictMode>
);
