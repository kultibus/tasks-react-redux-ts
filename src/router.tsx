import { createBrowserRouter, json } from "react-router-dom";
import { App } from "./App";
import { NotFound } from "./components/not-found/NotFound";
import { ProtectedRoute } from "./components/routes/ProtectedRoute";
import { PublicRoute } from "./components/routes/PublicRoute";
import { LoginPage, loginPageLoader } from "./pages/LoginPage";
import { HomePage, homePageLoader } from "./pages/HomePage";
import { Boards } from "./components/boards/Boards";
import { FormProject } from "./components/UI/form-project/FormProject";
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

// export const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <App />,
//         children: [
//             {
//                 errorElement: <NotFound />,
//                 children: [
//                     {
//                         path: "*",
//                         loader: ({ params }) => {
//                             throw json(
//                                 `The "/${params["*"]}" route doesn't exist`,
//                                 {
//                                     status: 404,
//                                 }
//                             );
//                         },
//                     },
//                     {
//                         element: <PublicRoute />,
//                         children: [
//                             {
//                                 path: RouteNames.login,
//                                 element: <LoginPage />,
//                             },
//                             {
//                                 path: RouteNames.register,
//                                 element: <RegisterPage />,
//                             },
//                         ],
//                     },
//                     {
//                         element: <ProtectedRoute />,
//                         children: [
//                             {
//                                 index: true,
//                                 loader: () => {
//                                     return redirect(RouteNames.projects);
//                                 },
//                             },
//                             {
//                                 path: RouteNames.projects,
//                                 element: <ProjectsPage />,
//                                 children: [
//                                     {
//                                         errorElement: <NotFound />,
//                                         children: [
//                                             {
//                                                 index: true,
//                                                 element: <FormProject />,
//                                             },
//                                             {
//                                                 path: RouteNames.addProject,
//                                                 element: <FormProject />,
//                                             },
//                                             {
//                                                 path: ":id",
//                                                 element: <Boards />,

//                                                 loader: boardsLoader,
//                                             },
//                                             {
//                                                 path: `:id/${RouteNames.editProject}`,
//                                                 element: <FormProject />,
//                                             },
//                                             {
//                                                 path: `:id/${RouteNames.deleteProject}`,
//                                                 element: <FormProject />,
//                                             },

//                                             {
//                                                 path: ":id/*",
//                                                 loader: ({ params }) => {
//                                                     throw json(
//                                                         `The "/${RouteNames.projects}/${params.id}/${params["*"]}" route doesn't exist`,
//                                                         {
//                                                             status: 404,
//                                                         }
//                                                     );
//                                                 },
//                                             },
//                                         ],
//                                     },
//                                 ],
//                             },
//                         ],
//                     },
//                 ],
//             },
//         ],
//     },
// ]);

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
                        loader: homePageLoader,
                    },
                    {
                        path: `${RouteNames.project}/:projectId`,
                        element: (
                            <ProtectedRoute>
                                <ProjectPage />
                            </ProtectedRoute>
                        ),
                        children: [
                            { index: true, element: <Boards /> },
                            {
                                path: `${RouteNames.editProject}`,
                                element: <FormProject />,
                            },
                            {
                                path: `${RouteNames.deleteProject}`,
                                element: <FormProject />,
                            },
                        ],
                    },
                    {
                        path: `${RouteNames.project}/${RouteNames.addProject}`,
                        element: (
                            <ProtectedRoute>
                                <ProjectPage />
                            </ProtectedRoute>
                        ),
                        children: [{ index: true, element: <FormProject /> }],
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
