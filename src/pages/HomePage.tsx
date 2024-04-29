import { FC } from "react";
import { Projects } from "../components/projects/Projects";
import { FormContainer } from "../components/form-container/FormContainer";
import {
    FormProject,
    FormProjectVariant,
} from "../components/UI/forms/form-project/FormProject";
import { useAppSelector } from "../hooks/redux";
import { Navigate } from "react-router-dom";
import { RouteNames } from "../router";

export const HomePage: FC = () => {
    const { projects } = useAppSelector(state => state.projectsReducer);

    return projects.length ? (
        <Navigate to={RouteNames.projects} />
    ) : (
        <FormContainer>
            <FormProject variant={FormProjectVariant.createProject} />
        </FormContainer>
    );
};
