import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { RouteNames, addSlash } from "../router";

interface PublicRouteProps {
    children: ReactNode;
}

export const PublicRoute: FC<PublicRouteProps> = ({ children }) => {
    const { isAuth } = useAppSelector(state => state.authReducer);

    if (!isAuth) {
        return <>{children}</>;
    }

    return <Navigate to={RouteNames.home} replace />;
};
