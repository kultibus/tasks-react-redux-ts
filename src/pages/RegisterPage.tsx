import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Register } from "../components/register/Register";
import { useAppSelector } from "../hooks/redux";
import { RouteNames } from "../router";

export const RegisterPage: FC = () => {
    const { isAuth } = useAppSelector(state => state.authReducer);

    if (isAuth) {
        return <Navigate to={RouteNames.home} replace />;
    }

    // return <>{error ? <Outlet /> : <Register />}</>;
    return <Register />;
};
