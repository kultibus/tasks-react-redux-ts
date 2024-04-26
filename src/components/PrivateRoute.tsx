import { FC, ReactNode } from "react";
import { useAppSelector } from "../hooks/redux";
import { RouteNames, addSlash } from "../router";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
    children: ReactNode;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
    const { isAuth } = useAppSelector(state => state.authReducer);

    if (isAuth) {
		return <Navigate to={RouteNames.home} replace />;
    }

	return <div>{children}</div>;
};
