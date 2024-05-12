import { createBrowserRouter, json } from "react-router-dom";
import { App } from "./App";
import { NotFound } from "./components/not-found/NotFound";
import { ProtectedRoutes } from "./components/routes/ProtectedRoutes";
import { PublicRoutes } from "./components/routes/PublicRoutes";
import { LoginPage, loginLoader } from "./pages/LoginPage";
import { ProjectsPage } from "./pages/ProjectsPage";

export enum RouteNames {
    login = "login",
    register = "register",
    projects = "projects",
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
//                         element: <PublicRoutes />,
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
//                         element: <ProtectedRoutes />,
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
                            <ProtectedRoutes>
                                <ProjectsPage />
                            </ProtectedRoutes>
                        ),
                    },
                    {
                        path: RouteNames.login,
                        element: (
                            <PublicRoutes>
                                <LoginPage />
                            </PublicRoutes>
                        ),
                        loader: loginLoader,
                    },
                    {
                        path: RouteNames.register,
                        element: (
                            <PublicRoutes>
                                <LoginPage />
                            </PublicRoutes>
                        ),
                        loader: loginLoader,
                    },
                ],
            },
        ],
    },
]);
