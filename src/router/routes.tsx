import { RouteObject } from "react-router-dom";
import { BoardsPage } from "../pages/BoardsPage";
import { LoginPage } from "../pages/LoginPage";
import { Layout } from "../components/layout/Layout";

// export interface IRoute {
//     path: string;
//     element: React.ComponentType;
// }

// export const publicRoutes: IRoute[] = [{ path: "login", element: Layout }];
export const publicRoutes: RouteObject[] = [
    {
        path: "login",
        element: <Layout />,
        children: [{ index: true, element: <LoginPage /> }],
    },
];

export const privateRoutes: RouteObject[] = [
    {
        path: "/",
        element: <Layout />,
        children: [{ index: true, element: <BoardsPage /> }],
    },
];
