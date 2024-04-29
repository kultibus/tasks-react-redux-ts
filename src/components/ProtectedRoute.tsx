import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { RouteNames } from "../router";

interface ProtectedRouteProps {
    children: ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuth, isLoading } = useAppSelector(state => state.authReducer);

    return isAuth || isLoading ? (
        <>{children}</>
    ) : (
        <Navigate to={`/${RouteNames.login}`} replace />
    );
};
