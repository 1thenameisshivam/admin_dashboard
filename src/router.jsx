import { createBrowserRouter } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/login/LoginPage";
import { Dashboard } from "./layout/Dashboard";
import NonAuth from "./layout/NonAuth";
import { Root } from "./layout/Root";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
        children: [
          {
            path: "",
            element: <HomePage />,
          },
        ],
      },
      {
        path: "/auth",
        element: <NonAuth />,
        children: [
          {
            path: "/auth/login",
            element: <LoginPage />,
          },
        ],
      },
    ],
  },
]);
