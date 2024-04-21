import { Navigate } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { useAppSelector } from "../hooks/redux";
import { RouteNames } from "../routes";

export const LoginPage = () => {
    const { isAuth } = useAppSelector(state => state.authReducer);

    if (isAuth) {
        return <Navigate to={RouteNames.home} replace />;
    }

    return <Layout />;
};
