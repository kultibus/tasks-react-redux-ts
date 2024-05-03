import { FC, ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { RouteNames } from "../../router";

interface ProtectedRoutesProps {
    children?: ReactNode;
    redirectPath?: string;
}

export const ProtectedRoutes: FC<ProtectedRoutesProps> = props => {
    const { children, redirectPath } = props;

    const { isAuth } = useAppSelector(state => state.userReducer);

    // return isAuth ? (
    //     <Outlet />
    // ) : (
    //     <Navigate to={`/${RouteNames.login}`} replace />
    // );
    return !isAuth ? (
        <Navigate to={`/${RouteNames.login}`} replace />
    ) : children ? (
        children
    ) : (
        <Outlet />
    );
};
