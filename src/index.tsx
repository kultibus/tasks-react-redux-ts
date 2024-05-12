import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./index.scss";
import { router } from "./router";
import { store } from "./store/store";

// const store = setupStore();

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);

// const str = 'http://localhost:5000/register'

// console.log(str.slice(str.lastIndexOf('/') + 1))