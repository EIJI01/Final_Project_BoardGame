import ReactDOM from "react-dom/client";
import "./index.css";
import { ContextProviders } from "./contexts/ContextProvider.tsx";
import { router } from "./routes/Routes.tsx";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import ThemeContextProviders from "./contexts/ThemeContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ContextProviders>
    <ThemeContextProviders>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ThemeContextProviders>
  </ContextProviders>
);
