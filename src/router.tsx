import { createBrowserRouter } from "react-router-dom";
import { AppPractice } from "./practice-router/AppPractice";
import { About } from "./practice-router/About";
import { Home } from "./practice-router/Home";
import { Blog } from "./practice-router/Blog";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AppPractice />,
        children: [
            { index: true, element: <Home /> },
            { path: "/about", element: <About /> },
            { path: "/blog", element: <Blog /> },
        ],
    },
]);
