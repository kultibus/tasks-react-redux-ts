import { FC, ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context";

interface PublicRouteProps {
    children?: ReactNode;
}

export const PublicRoute: FC<PublicRouteProps> = ({ children }) => {
    const isAuth = useContext(AuthContext);

    return !isAuth ? children : <Navigate to={`/`} replace />;
};
