import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { RouteNames } from "../../router";

interface PublicRouteProps {
    children: ReactNode;
}

export const PublicRoute: FC<PublicRouteProps> = ({ children }) => {
    const { isAuth } = useAppSelector(state => state.userReducer);

    return isAuth ? <Navigate to={RouteNames.home} replace /> : <>{children}</>;
};
