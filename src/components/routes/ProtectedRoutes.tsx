import { FC, ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { RouteNames } from "../../router";

interface ProtectedRoutesProps {
    children?: ReactNode;
    redirectPath?: string;
}

export const ProtectedRoutes: FC<ProtectedRoutesProps> = () => {
    const { isUserAuth } = useAppSelector(state => state.userReducer);

    return isUserAuth ? (
        <Outlet />
    ) : (
        <Navigate to={`/${RouteNames.login}`} replace />
    );
};
