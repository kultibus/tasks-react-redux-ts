import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { RouteNames } from "../router";
import { Login } from "../components/Login";
import { useAuth } from "../hooks/useAuth";

// export const LoginPage: FC = () => {
//     const { isAuth } = useAppSelector(state => state.authReducer);

//     if (!isAuth) {
//         return <Login />;
//     }

//     return <Navigate to={RouteNames.home} replace />;
// };

export const LoginPage: FC = () => {
    return <Login />;
};
