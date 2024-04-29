import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { PrivateRoute } from "./components/PrivateRoute";
import { PublicRoute } from "./components/PublicRoute";
import { Projects } from "./components/projects/Projects";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { HomePage } from "./pages/HomePage";

export enum RouteNames {
    login = "login",
    register = "register",
    projects = "projects",
    home = "/",
}

export const addSlash = (routeName: RouteNames) => {
    return `/${routeName}`;
};

export const router = createBrowserRouter([
    {
        path: RouteNames.home,
        element: <App />,
        errorElement: <App />,
        children: [
            {
                index: true,
                element: (
                    <PrivateRoute>
                        <HomePage />
                    </PrivateRoute>
                ),
            },
            {
                path: RouteNames.projects,
                element: (
                    <PrivateRoute>
                        <HomePage />
                    </PrivateRoute>
                ),
            },
            {
                path: RouteNames.login,
                element: (
                    <PublicRoute>
                        <LoginPage />
                    </PublicRoute>
                ),
            },
            {
                path: RouteNames.register,
                element: (
                    <PublicRoute>
                        <RegisterPage />
                    </PublicRoute>
                ),
            },
        ],
    },
]);
