import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.scss";
import { setupStore } from "./store/store";
import { routes } from "./routes";

const store = setupStore();

const root = createRoot(document.getElementById("root") as HTMLElement);

const router = createBrowserRouter(routes);

root.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
