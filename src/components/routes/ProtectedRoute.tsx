import { FC, ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../App";
import { RouteNames } from "../../router";

interface ProtectedRouteProps {
    children: ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
    const isAuth = useContext(AuthContext);

    return isAuth ? (
        <>{children}</>
    ) : (
        <Navigate to={`/${RouteNames.login}`} replace />
    );
};
