import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./index.scss";
import { router } from "./router";
import { store } from "./store/store";
import isEqual from "lodash.isequal";
import { formatDate } from "./utils/formatDate";
import { error } from "./components/UI/app-input/AppInput.module.scss";

// const store = setupStore();

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);

