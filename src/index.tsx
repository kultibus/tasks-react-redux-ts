import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./firebase";
import "./index.scss";
import { router } from "./router";
import { store } from "./store/store";
import { createContext } from "react";

// const store = setupStore();

export const authContext = createContext(false)

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);



