import { FC, ReactNode, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../App";

interface PublicRoutesProps {
    children?: ReactNode;
}

export const PublicRoutes: FC<PublicRoutesProps> = ({ children }) => {
    const isAuth = useContext(AuthContext);

    return isAuth ? <Navigate to={`/`} replace /> : <Outlet />;
};
