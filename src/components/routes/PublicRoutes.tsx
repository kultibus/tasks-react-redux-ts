import { FC, ReactNode, useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../App";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { checkUserAuth } from "../../store/slices/user-slice/userActionCreators";

interface PublicRoutesProps {
    children?: ReactNode;
}

export const PublicRoutes: FC<PublicRoutesProps> = ({ children }) => {
    const isAuth = useContext(AuthContext);

    return isAuth ? <Navigate to={`/`} replace /> : <Outlet />;
};
