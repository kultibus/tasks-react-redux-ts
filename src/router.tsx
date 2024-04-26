import { Navigate, createBrowserRouter, json } from "react-router-dom";
import { App } from "./App";
import { ProjectsPage } from "./pages/ProjectsPage";
import { LoginPage } from "./pages/LoginPage";
import { NotFound } from "./pages/NotFoundPage";
import { RegisterPage } from "./pages/RegisterPage";
import { PrivateRoute } from "./components/PrivateRoute";
import { PublicRoute } from "./components/PublicRoute";

export enum RouteNames {
    login = "login",
    register = "register",
    home = "/",
}

export const addSlash = (routeName: RouteNames) => {
    return `/${routeName}`;
};

// export const router = createBrowserRouter([
//     {
//         path: RouteNames.home,
//         element: <App />,
//         errorElement: <NotFound />,
//         children: [
//             {
//                 index: true,
//                 element: <ProjectsPage />,
//             },
//         ],
//     },
//     {
//         path: addSlash(RouteNames.login),
//         element: <App />,
//         children: [
//             {
//                 index: true,
//                 element: <LoginPage />,
//             },
//         ],
//     },
//     {
//         path: addSlash(RouteNames.register),
//         element: <App />,
//         children: [
//             {
//                 index: true,
//                 element: <RegisterPage />,
//             },
//         ],
//     },
// ]);

export const router = createBrowserRouter([
    {
        path: RouteNames.home,
        element: (
            <PublicRoute>
                <App />
            </PublicRoute>
        ),
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <ProjectsPage />,
            },
        ],
    },

    {
        path: addSlash(RouteNames.login),
        element: (
            <PrivateRoute>
                <App />
            </PrivateRoute>
        ),
        children: [
            {
                index: true,
                element: <LoginPage />,
            },
        ],
    },
    {
        path: addSlash(RouteNames.register),
        element: (
            <PrivateRoute>
                <App />
            </PrivateRoute>
        ),
        children: [
            {
                index: true,
                element: <RegisterPage />,
            },
        ],
    },
]);
