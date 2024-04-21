import { Navigate, createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { BoardsPage } from "./pages/BoardsPage";
import { LoginPage } from "./pages/LoginPage";
import { NotFound } from "./pages/NotFound";
import { RegisterPage } from "./pages/RegisterPage";

export enum RouteNames {
    login = "login",
    register = "registration",
    home = "/",
}

export const router = createBrowserRouter([
    {
        path: RouteNames.home,
        element: <App />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <BoardsPage />,
            },
            {
                path: RouteNames.login,
                element: <LoginPage />,
            },
            {
                path: RouteNames.register,
                element: <RegisterPage />,
            },
        ],
    },
    {
        path: "*",
        element: <Navigate to={RouteNames.home} />,
    },
]);
