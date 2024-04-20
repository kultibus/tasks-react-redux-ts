import { createRoot } from "react-dom/client";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.scss";
import { App } from "./App";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
]);

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(<RouterProvider router={router} />);
