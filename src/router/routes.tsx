import { Navigate, RouteObject } from "react-router-dom";
import { BoardsPage } from "../pages/BoardsPage";
import { LoginPage } from "../pages/LoginPage";
import { Layout } from "../components/layout/Layout";
import { RequireAuth } from "../hoc/RequireAuth";

export enum RouteNames {
    login = "login",
    home = "/",
}

export const publicRoutes: RouteObject[] = [
    {
        path: RouteNames.login,
        element: <Layout />,
        children: [{ index: true, element: <LoginPage /> }],
    },
    {
        path: "*",
        element: <Navigate to={RouteNames.login} />,
    },
];

export const privateRoutes: RouteObject[] = [
    {
        path: RouteNames.home,
        element: <Layout />,
        children: [{ index: true, element: <BoardsPage /> }],
    },
    {
        path: "*",
        element: <Navigate to={RouteNames.home} />,
    },
];
