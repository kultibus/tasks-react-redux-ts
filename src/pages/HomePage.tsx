import { FC } from "react";
import { Navigate } from "react-router-dom";
import {
	FormProject,
	FormProjectVariant,
} from "../components/UI/form-project/FormProject";
import { FormContainer } from "../components/form-container/FormContainer";
import { useAppSelector } from "../hooks/redux";
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
