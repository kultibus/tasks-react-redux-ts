import { createBrowserRouter, json } from "react-router-dom";
import { App } from "./App";
import { NotFound } from "./components/not-found/NotFound";
import { ProtectedRoute } from "./components/routes/ProtectedRoute";
import { PublicRoute } from "./components/routes/PublicRoute";
import { LoginPage, loginPageLoader } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { Boards } from "./components/boards/Boards";
import { FormProject } from "./components/UI/form-project/FormProject";
import { ProjectLayout } from "./components/project-layout/ProjectLayout";
import { ProjectPage } from "./pages/ProjectPage";

export enum RouteNames {
    login = "login",
    register = "register",
    project = "project",
    addProject = "add",
    deleteProject = "delete",
    editProject = "edit",
    root = "/",
}

export const router = createBrowserRouter([
    {
        path: RouteNames.root,
        element: <App />,
        children: [
            {
                errorElement: <NotFound />,
                children: [
                    {
                        path: "*",
                        loader: () => {
                            throw json("", {
                                status: 404,
                                statusText: "Route not Found",
                            });
                        },
                    },
                    {
                        index: true,
                        element: (
                            <ProtectedRoute>
                                <HomePage />
                            </ProtectedRoute>
                        ),
                        loader: ({ request }) => {
                            const url = new URL(request.url);

                            return url.pathname;
                        },
                    },
                    {
                        path: RouteNames.project,
                        element: (
                            <ProtectedRoute>
                                <ProjectPage />
                            </ProtectedRoute>
                        ),
                        children: [
                            {
                                path: ":id",
                                element: <ProjectLayout />,
                                children: [
                                    {
                                        index: true,
                                        element: <Boards />,
                                    },
                                    {
                                        path: RouteNames.editProject,
                                        element: <FormProject />,
                                    },
                                    {
                                        path: RouteNames.deleteProject,
                                        element: <FormProject />,
                                    },
                                ],
                            },
                            {
                                path: RouteNames.addProject,
                                element: <ProjectLayout />,
                                children: [
                                    {
                                        index: true,
                                        element: <FormProject />,
                                    },
                                ],
                            },
                        ],
                    },

                    {
                        path: RouteNames.login,
                        element: (
                            <PublicRoute>
                                <LoginPage />
                            </PublicRoute>
                        ),
                        loader: loginPageLoader,
                    },
                    {
                        path: RouteNames.register,
                        element: (
                            <PublicRoute>
                                <LoginPage />
                            </PublicRoute>
                        ),
                        loader: loginPageLoader,
                    },
                ],
            },
        ],
    },
]);
