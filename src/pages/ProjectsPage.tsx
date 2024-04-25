import { FC } from "react";
import { Navigate } from "react-router-dom";
import { Projects } from "../components/projects/Projects";
import { useAppSelector } from "../hooks/redux";
import { RouteNames } from "../router";

export const ProjectsPage: FC = () => {
    const { isAuth } = useAppSelector(state => state.authReducer);

    if (isAuth) {
        return <Projects />;
    }

    return <Navigate to={RouteNames.login} replace />;
};
