import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";
import { Projects } from "./components/projects/Projects";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { HomePage } from "./pages/HomePage";
import { ProjectsPage } from "./pages/ProjectsPage";

export enum RouteNames {
    login = "login",
    register = "register",
    projects = "projects",
    home = "/",
}

export const router = createBrowserRouter([
    {
        path: RouteNames.home,
        element: <App />,
        errorElement: <App />,
        children: [
            {
                index: true,
                element: (
                    <ProtectedRoute>
                        <HomePage />
                    </ProtectedRoute>
                ),
            },
            {
                path: `${RouteNames.projects}/:projectId`,
                element: (
                    <ProtectedRoute>
                        <ProjectsPage />
                    </ProtectedRoute>
                ),
                // loader: ({ params }) => {
                //     console.log(params);
                //     return params;
                // },
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
