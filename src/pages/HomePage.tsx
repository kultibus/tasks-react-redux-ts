import { FC } from "react";
import { Projects } from "../components/projects/Projects";
import { FormContainer } from "../components/form-container/FormContainer";
import {
    FormProject,
    FormProjectVariant,
} from "../components/UI/form-project/FormProject";
import { useAppSelector } from "../hooks/redux";
import { Navigate, useParams } from "react-router-dom";
import { RouteNames } from "../router";
import { useCurrentProject } from "../hooks/useCurrentProject";

export const HomePage: FC = () => {
    const { projects } = useAppSelector(state => state.projectsReducer);

    const { name } = useCurrentProject(projects);

    // return projects.length ? (
    //     <Navigate to={RouteNames.projects} />
    return projects.length && name ? (
        <Navigate to={`${RouteNames.projects}/${name}`} />
    ) : (
        <FormContainer>
            <FormProject variant={FormProjectVariant.createProject} />
        </FormContainer>
    );
};
