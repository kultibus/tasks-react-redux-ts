import { FC, ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";

interface PublicRouteProps {
    children?: ReactNode;
}

export const PublicRoute: FC<PublicRouteProps> = ({ children }) => {
    const { isUserAuth } = useAppSelector(state => state.userReducer);

    return isUserAuth ? <Navigate to={`/`} replace /> : children;
};
