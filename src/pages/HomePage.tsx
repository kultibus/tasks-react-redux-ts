import { FC, useEffect, useMemo } from "react";
import { Navigate } from "react-router-dom";
import { FormProject } from "../components/UI/form-project/FormProject";
import { FormContainer } from "../components/form-container/FormContainer";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { RouteNames } from "../router";
import { IFormVariant } from "../models/IForm";
import { setFormVariant } from "../store/slices/form-slice/formSlice";

export const HomePage: FC = () => {
    const { projects, currentProject } = useAppSelector(
        state => state.projectsReducer
    );

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setFormVariant(IFormVariant.initial));
    }, []);

    return projects.length ? (
        <Navigate to={`/${RouteNames.projects}/${currentProject.id}`} />
        // <Navigate to={`/${RouteNames.projects}`} />
    ) : (
        <FormContainer>
            <FormProject />
        </FormContainer>
    );
};
