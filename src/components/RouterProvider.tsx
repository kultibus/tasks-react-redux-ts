import { FC, ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { RouteNames, addSlash } from "../router";
import { Navigate } from "react-router-dom";
import { authSlice } from "../store/slices/authSlice/authSlice";
import { IUser } from "../models/IUser";

interface RouterProviderProps {
    children: ReactNode;
}

export const RouterProvider: FC<RouterProviderProps> = ({ children }) => {
    // const { isAuth } = useAppSelector(state => state.authReducer);

    const isAuth = true;

    if (!isAuth) {
        return <div>{children}</div>;
    }

    return <Navigate to={RouteNames.home} replace />;
};
