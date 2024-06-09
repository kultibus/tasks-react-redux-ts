import { FC, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { FormProject } from "../components/UI/form-project/FormProject";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { RouteNames } from "../router";
import { setFormVariant, setIsFormOpened } from "../store/slices/formSlice";
import { IFormVariant } from "../types/models/IForm";

export const HomePage: FC = () => {
    const { activeProject } = useAppSelector(state => state.projectsReducer);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setFormVariant(IFormVariant.initialProject));
        dispatch(setIsFormOpened(true));
    }, [dispatch]);

    return activeProject ? (
        <Navigate to={`/${RouteNames.project}/${activeProject.name}`} />
    ) : (
        <FormProject />
    );
};
