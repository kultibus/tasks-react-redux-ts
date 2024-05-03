import { FC, ReactNode, useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { RouteNames } from "../../router";
import { checkUserAuth } from "../../store/slices/user-slice/userActionCreators";
import { AuthContext } from "../../App";

interface ProtectedRoutesProps {
    children?: ReactNode;
    redirectPath?: string;
}

export const ProtectedRoutes: FC<ProtectedRoutesProps> = () => {
    const isAuth = useContext(AuthContext);

    return isAuth ? (
        <Outlet />
    ) : (
        <Navigate to={`/${RouteNames.login}`} replace />
    );
};
