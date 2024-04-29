import { FC } from "react";
import { Projects } from "../components/projects/Projects";
import { useAppSelector } from "../hooks/redux";
import { Navigate } from "react-router-dom";
import { RouteNames } from "../router";

export const ProjectsPage: FC = () => {
    const { projects } = useAppSelector(state => state.projectsReducer);

    return projects.length ? <Projects /> : <Navigate to={RouteNames.home} />;
};
