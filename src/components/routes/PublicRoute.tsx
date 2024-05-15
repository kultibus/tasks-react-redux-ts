import { FC, ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";

interface PublicRouteProps {
    children?: ReactNode;
}

export const PublicRoute: FC<PublicRouteProps> = ({ children }) => {
    const { user } = useAppSelector(state => state.userReducer);

    return !!user ? <Navigate to={`/`} replace /> : children;
};
