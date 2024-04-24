import { FC } from "react";
import { useAppSelector } from "../hooks/redux";
import { Navigate } from "react-router-dom";
import { RouteNames } from "../router";
import { Boards } from "../components/boards/Boards";

export const BoardsPage: FC = () => {
    const { isAuth } = useAppSelector(state => state.authReducer);


    if (isAuth) {
        return <Boards />;
    }

    return <Navigate to={RouteNames.login} replace />;
};
