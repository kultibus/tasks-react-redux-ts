import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { RouteNames } from "../routes";

export const RequireAuth = () => {
    const { isAuth } = useAppSelector(state => state.authReducer);

    return (
        <>
            {isAuth ? (
                <Navigate to={RouteNames.home} replace />
            ) : (
                <Navigate to={RouteNames.login} replace />
            )}
        </>
    );
};
