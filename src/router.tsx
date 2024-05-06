import { createBrowserRouter, json, redirect } from "react-router-dom";
import { App } from "./App";
import { FormProject } from "./components/UI/form-project/FormProject";
import { Boards } from "./components/boards/Boards";
import { NotFound } from "./components/not-found/NotFound";
import { ProtectedRoutes } from "./components/routes/ProtectedRoutes";
import { PublicRoutes } from "./components/routes/PublicRoutes";
import { LoginPage } from "./pages/LoginPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { RegisterPage } from "./pages/RegisterPage";

export enum RouteNames {
    login = "login",
    register = "register",
    projects = "projects",
    addProject = "add",
    deleteProject = "delete",
    editProject = "edit",
    root = "/",
}

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                errorElement: <NotFound />,
                children: [
                    {
                        path: "*",
                        loader: ({ params }) => {
                            throw json(
                                `The "/${params["*"]}" route doesn't exist`,
                                {
                                    status: 404,
                                }
                            );
                        },
                    },
                    {
                        element: <PublicRoutes />,
                        children: [
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
                        element: <ProtectedRoutes />,
                        children: [
                            {
                                index: true,
                                loader: () => {
                                    return redirect(RouteNames.projects);
                                },
                            },
                            {
                                path: RouteNames.projects,
                                element: <ProjectsPage />,
                                children: [
                                    {
                                        errorElement: <NotFound />,
                                        children: [
                                            {
                                                index: true,
                                                element: <FormProject />,
                                            },
                                            {
                                                path: RouteNames.addProject,
                                                element: <FormProject />,
                                            },
                                            {
                                                path: ":id",
                                                element: <Boards />,
                                            },
                                            {
                                                path: `:id/${RouteNames.editProject}`,
                                                element: <FormProject />,
                                            },
                                            {
                                                path: `:id/${RouteNames.deleteProject}`,
                                                element: <FormProject />,
                                            },

                                            {
                                                path: ":id/*",
                                                loader: ({ params }) => {
                                                    throw json(
                                                        `The "/${RouteNames.projects}/${params.id}/${params["*"]}" route doesn't exist`,
                                                        {
                                                            status: 404,
                                                        }
                                                    );
                                                },
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
]);
