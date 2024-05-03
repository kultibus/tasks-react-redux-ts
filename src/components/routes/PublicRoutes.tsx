import { FC, ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { RouteNames } from "../../router";

interface PublicRoutesProps {
    children?: ReactNode;
}

// export const PublicRoutes: FC<PublicRouteProps> = ({ children }) => {
//     const { isAuth } = useAppSelector(state => state.userReducer);

//     return isAuth ? <Navigate to={`/`} /> : <>{children}</>;
// };

export const PublicRoutes: FC<PublicRoutesProps> = ({ children }) => {
    const { isAuth } = useAppSelector(state => state.userReducer);

    return isAuth ? <Navigate to={`/`}  replace/> : <Outlet />;
};
