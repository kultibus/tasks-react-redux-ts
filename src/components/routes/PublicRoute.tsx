import { FC, ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { RouteNames } from "../../router";
import { AuthContext } from "../../App";

interface PublicRouteProps {
    children: ReactNode;
}

export const PublicRoute: FC<PublicRouteProps> = ({ children }) => {
    const isAuth = useContext(AuthContext)

    return isAuth ? <Navigate to={RouteNames.home} replace /> : <>{children}</>;
};
