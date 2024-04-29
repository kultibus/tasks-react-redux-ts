import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { RouteNames } from "../router";

interface PublicRouteProps {
    children: ReactNode;
}

export const PublicRoute: FC<PublicRouteProps> = ({ children }) => {
    const { isAuth, isLoading } = useAppSelector(state => state.authReducer);

    return isAuth || isLoading ? (
        <Navigate to={RouteNames.home} replace />
    ) : (
        <>{children}</>
    );
};
