import { useRoutes } from "react-router-dom";
import { APP_PATHS } from "./path";
import Loadable from "./Loadable";
import { lazy } from "react";
import MainLayout from "@/components/custom/MainLayout";

const LoginPage = Loadable(lazy(() => import("../pages/auth/login")));
const HomePage = Loadable(lazy(() => import("../pages/home/HomePage")));
const UserDetailPage = Loadable(
  lazy(() => import("../pages/home/[id]/HomeDetails"))
);

const authRoutes = {
  path: APP_PATHS.auth,
  children: [{ path: APP_PATHS.login, element: <LoginPage /> }],
};

const homeRoutes = {
  path: APP_PATHS.home,
  element: <MainLayout />,
  children: [
    { path: APP_PATHS.home, element: <HomePage /> },
    {
      path: "users/:id",
      element: <UserDetailPage />,
    },
  ],
};

export default function Routes() {
  return useRoutes([authRoutes, homeRoutes]);
}
