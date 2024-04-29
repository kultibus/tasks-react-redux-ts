import { FC, ReactNode } from "react";
import { useAppSelector } from "../hooks/redux";
import { RouteNames, addSlash } from "../router";
import { Navigate, useParams } from "react-router-dom";
import { MainCnt } from "./main-cnt/MainCnt";

interface PrivateRouteProps {
    children: ReactNode;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
    const { isAuth } = useAppSelector(state => state.authReducer);

    if (isAuth) {
        return <>{children}</>;
    }

    return <Navigate to={RouteNames.login} replace />;
};
