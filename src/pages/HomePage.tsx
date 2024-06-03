import { FC, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { FormProject } from "../components/UI/form-project/FormProject";
import { useAppDispatch } from "../hooks/redux";
import { RouteNames } from "../router";
import {
    setFormVariant,
    setIsFormOpened,
} from "../store/slices/form-slice/formSlice";
import { IFormVariant } from "../types/models/IForm";
import { useProjects } from "../hooks/useProjects";

export const HomePage: FC = () => {
    const {activeProject} = useProjects();

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setFormVariant(IFormVariant.initialProject));
        dispatch(setIsFormOpened(true));
    }, [dispatch]);

    return activeProject ? (
        <Navigate to={`/${RouteNames.project}/${activeProject.id}`} />
    ) : (
        <FormProject />
    );
};
