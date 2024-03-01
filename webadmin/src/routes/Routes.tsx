import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Suspense } from "react";
import { Loading } from "../components";
import { Login, Register } from "../pages";

import React from "react";

const Dashboard = React.lazy(() => {
  return new Promise<any>((resolve) => {
    setTimeout(
      () => resolve(import("../pages").then(({ Dashboard }) => ({ default: Dashboard }))),
      1500
    );
  });
});

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<Loading />}>
            <Dashboard />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  { path: "/register", element: <Register /> },
]);
