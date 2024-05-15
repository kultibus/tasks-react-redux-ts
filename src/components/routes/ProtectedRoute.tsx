import { FC, ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { RouteNames } from "../../router";
import { useAppSelector } from "../../hooks/redux";

interface ProtectedRouteProps {
    children?: ReactNode;
    redirectPath?: string;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
    const { user } = useAppSelector(state => state.userReducer);

    return !!user ? children : <Navigate to={`/${RouteNames.login}`} replace />;
};
