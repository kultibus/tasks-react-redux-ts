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
    // const dispatch = useAppDispatch();

    // const { setAuth, setUser } = authSlice.actions;

    // useEffect(() => {
    //     if (localStorage.getItem("auth")) {
    //         dispatch(setAuth(true));
    //         dispatch(
    //             setUser({
    //                 displayName: localStorage.getItem("name" || ""),
    //                 uid: localStorage.getItem("id"),
    //             } as IUser)
    //         );
    //     }
    // }, []);

    const { isAuth } = useAppSelector(state => state.authReducer);

    if (isAuth) {
        return <div>{children}</div>;
    }

    return <Navigate to={addSlash(RouteNames.login)} replace />;
};