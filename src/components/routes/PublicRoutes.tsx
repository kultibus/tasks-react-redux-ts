import { FC, ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";

interface PublicRoutesProps {
    children?: ReactNode;
}

export const PublicRoutes: FC<PublicRoutesProps> = ({ children }) => {
    const { isUserAuth } = useAppSelector(state => state.userReducer);

    return isUserAuth ? <Navigate to={`/`} replace /> : children;
};
