import { FC, ReactNode, useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useLoaderData } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { RouteNames } from "../../router";
import { checkUserAuth } from "../../store/slices/user-slice/userActionCreators";
import { AuthContext } from "../../App";
import { auth } from "../../firebase";

interface ProtectedRoutesProps {
    children?: ReactNode;
    redirectPath?: string;
}

export const ProtectedRoutes: FC<ProtectedRoutesProps> = () => {
    // const isAuth = useContext(AuthContext);

    // const loaderData = useLoaderData();

    // console.log(loaderData);

    const [isAuth, setIsAuth] = useState<boolean>(
        !!localStorage.getItem("auth")
    );

    const { userAuth } = useAppSelector(state => state.userReducer);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkUserAuth());
        setIsAuth(userAuth);
    }, [isAuth]);

    return isAuth ? (
        <Outlet />
    ) : (
        <Navigate to={`/${RouteNames.login}`} replace />
    );
};
