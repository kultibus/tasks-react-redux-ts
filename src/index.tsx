import { createRoot } from "react-dom/client";
import { App } from "./App";

import { BrowserRouter, RouterProvider } from "react-router-dom";
import { router } from "./router";

// import "./global.scss";
import "./index.scss";
import { AppPractice } from "./practice-router/AppPractice";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(<RouterProvider router={router} />);
