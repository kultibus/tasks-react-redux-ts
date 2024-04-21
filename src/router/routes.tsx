import { Navigate, RouteObject } from "react-router-dom";
import { App } from "../App";
import { BoardsPage } from "../pages/BoardsPage";
import { LoginPage } from "../pages/LoginPage";

export enum RouteNames {
    login = "login",
    home = "/",
}

export const publicRoutes: RouteObject[] = [
    {
        path: RouteNames.login,
        element: <App />,
        children: [{ index: true, element: <LoginPage /> }],
    },
    {
        path: "*",
        element: <Navigate to={RouteNames.login} replace />,
    },
];

export const privateRoutes: RouteObject[] = [
    {
        path: RouteNames.home,
        element: <App />,
        children: [{ index: true, element: <BoardsPage /> }],
    },
    {
        path: "*",
        element: <Navigate to={RouteNames.home} replace />,
    },
];
