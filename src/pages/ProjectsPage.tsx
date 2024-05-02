import { FC } from "react";
import { Projects } from "../components/projects/Projects";
import { useAppSelector } from "../hooks/redux";
import { Navigate, useRouteError } from "react-router-dom";
import { RouteNames } from "../router";

export const ProjectsPage: FC = () => {
    const { projects } = useAppSelector(state => state.projectsReducer);

    return projects.length ? <Projects /> : <Navigate to={RouteNames.home} />;
};

// export const ProjectsPage: FC = () => {
//     const error = useRouteError();

//     const message = (error as { data?: string })?.data;
//     const status = (error as { status?: string })?.status;

//     const { projects } = useAppSelector(state => state.projectsReducer);

//     return error ? (
//         <NotFound message={message} status={status} />
//     ) : projects.length ? (
//         <Projects />
//     ) : (
//         <Navigate to={RouteNames.home} />
//     );
// };
