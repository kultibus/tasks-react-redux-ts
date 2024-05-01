import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { RouteNames } from "../router";

interface ProtectedRouteProps {
    children: ReactNode;
}


export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuth } = useAppSelector(state => state.authReducer);

    return isAuth ? (
        <>{children}</>
    ) : (
        <Navigate to={`/${RouteNames.login}`} replace />
    );
};
