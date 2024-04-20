import { createBrowserRouter } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes";

const auth = false;

let routes = auth ? privateRoutes : publicRoutes;

export const router = createBrowserRouter(routes);
