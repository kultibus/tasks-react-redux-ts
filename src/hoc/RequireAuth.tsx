import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { App } from "../App";

export const RequireAuth = () => {
    const location = useLocation();
    const { isAuth } = useAppSelector(state => state.authReducer);

    // if (!isAuth) {
    //     return <Navigate to="login" replace />;
    // }

    return <Outlet />;
};
