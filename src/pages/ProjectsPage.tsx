import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { Navigate, useRouteError } from "react-router-dom";
import { RouteNames } from "../router";
import { ProjectsLayout } from "../components/projects-layout/ProjectsLayout";
import { setFormVariant } from "../store/slices/form-slice/formSlice";
import { IFormVariant } from "../models/IForm";

export const ProjectsPage: FC = () => {
    const { projects, currentProject } = useAppSelector(
        state => state.projectsReducer
    );

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setFormVariant(IFormVariant.initial));
    }, []);

    // return <ProjectsLayout />;

    return projects.length ? (
        <Navigate to={`/${RouteNames.projects}/${currentProject.id}`} />
    ) : (
        <ProjectsLayout />
    );
};
