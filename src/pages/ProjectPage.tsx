import { FC } from "react";
import { Navigate } from "react-router-dom";
import { ProjectLayout } from "../components/project-layout/ProjectLayout";
import { useAppSelector } from "../hooks/redux";

export const ProjectPage: FC = () => {
    const { projects } = useAppSelector(state => state.projectsReducer);

    return projects.length ? <ProjectLayout /> : <Navigate to={`/`} />;
};
1