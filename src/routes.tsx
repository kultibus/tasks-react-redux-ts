import { Navigate, RouteObject } from "react-router-dom";
import { App } from "./App";
import { BoardsPage } from "./pages/BoardsPage";
import { LoginPage } from "./pages/LoginPage";
import { RequireAuth } from "./hoc/RequireAuth";

export enum RouteNames {
    login = "login",
    home = "/",
}

export const routes: RouteObject[] = [
    {
        path: RouteNames.home,
        element: <App />,
        children: [{ index: true, element: <BoardsPage /> }],
    },
    // {
    //     path: RouteNames.login,
    //     element: <App />,
    //     children: [{ index: true, element: <LoginPage /> }],
    // },
];
