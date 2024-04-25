import { FC } from "react";
import { Navigate } from "react-router-dom";
import { Register } from "../components/UI/Register";
import { useAppSelector } from "../hooks/redux";
import { RouteNames } from "../router";

export const RegisterPage: FC = () => {
    const { isAuth } = useAppSelector(state => state.authReducer);

    if (!isAuth) {
        return <Register />;
    }

    return <Navigate to={RouteNames.home} replace />;
};
