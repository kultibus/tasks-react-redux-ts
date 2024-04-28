import { FC, ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { RouteNames, addSlash } from "../router";
import { Navigate } from "react-router-dom";
import { authSlice } from "../store/slices/authSlice/authSlice";
import { IUser } from "../models/IUser";

interface PublicRouteProps {
    children: ReactNode;
}

export const PublicRoute: FC<PublicRouteProps> = ({ children }) => {

    const { isAuth } = useAppSelector(state => state.authReducer);

    if (isAuth) {
        return <div>{children}</div>;
    }

    return <Navigate to={addSlash(RouteNames.login)} replace />;
};
