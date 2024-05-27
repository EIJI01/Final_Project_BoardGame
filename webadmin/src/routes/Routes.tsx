import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Branch, BranchId, BranchMain, Dashboard, Login, NotFound, Register } from "../pages";
import RegisterGM from "../pages/RegisterGM";
import CreateQRcode from "../pages/CreateQRcode";

// import ProtectedRoute from "../hooks/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "branch-manage",
        element: <BranchMain />,
        children: [
          {
            path: "",
            element: <Branch />,
          },
          {
            path: ":id",
            element: <BranchId />,
          },
        ],
      },
      {
        path: "register-gm",
        element: <RegisterGM />,
      },
      {
        path: "generate-qrcode",
        element: <CreateQRcode />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  { path: "/register", element: <Register /> },
  { path: "*", element: <NotFound /> },
]);
