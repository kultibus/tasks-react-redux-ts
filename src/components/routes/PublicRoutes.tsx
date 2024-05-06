import { FC, ReactNode, useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../App";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { checkUserAuth } from "../../store/slices/user-slice/userActionCreators";

interface PublicRoutesProps {
    children?: ReactNode;
}

export const PublicRoutes: FC<PublicRoutesProps> = ({ children }) => {
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
    }, []);

    return isAuth ? <Navigate to={`/`} replace /> : <Outlet />;
};
