import { FC, ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { RouteNames } from "../../router";

interface ProtectedRouteProps {
    children?: ReactNode;
    redirectPath?: string;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
    const { isUserAuth } = useAppSelector(state => state.userReducer);

    return isUserAuth ? (
        children
    ) : (
        <Navigate to={`/${RouteNames.login}`} replace />
    );
};
