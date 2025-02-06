import { createBrowserRouter } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/login/LoginPage";
import { Dashboard } from "./layout/Dashboard";
import NonAuth from "./layout/NonAuth";
import { Root } from "./layout/Root";
import { UsersPage } from "./pages/user/UsersPage";
import { TenantPage } from "./pages/tenant/TenantPage";

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
          {
            path: "/users",
            element: <UsersPage />,
          },
          {
            path: "/resturants",
            element: <TenantPage />,
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
