import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { RouteNames } from "../router";
import { HomePage } from "../pages/BoardsPage";

export const RequireAuth = ({ children }) => {
    const location = useLocation();

    const { isAuth } = useAppSelector(state => state.authReducer);

    if (isAuth) {
        return children;
    } else {
        return <Navigate to={RouteNames.login} />;
    }
};
