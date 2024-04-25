import { Navigate, createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { ProjectsPage } from "./pages/ProjectsPage";
import { LoginPage } from "./pages/LoginPage";
import { NotFound } from "./pages/NotFound";
import { RegisterPage } from "./pages/RegisterPage";

export enum RouteNames {
    login = "login",
    register = "register",
    home = "/",
}

export const router = createBrowserRouter([
    // {
    //     path: "*/*",
    //     element: <App />,
    //     // errorElement: <NotFound />,
    //     children: [
    //         {
    //             index: true,
    //             element: <NotFound />,
    //         },
    //     ],
    //     // element: <Navigate to={RouteNames.home} />,
    // },
    {
        path: RouteNames.home,
        element: <App />,
        // errorElement: <NotFound />,
        children: [
            {	
                errorElement: <NotFound />,
                children: [
                    {
                        index: true,
                        element: <ProjectsPage />,
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
        ],
    },
]);
