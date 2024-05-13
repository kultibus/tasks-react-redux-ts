import { FC, useEffect } from "react";
import { Navigate, useNavigation } from "react-router-dom";
import { FormProject } from "../components/UI/form-project/FormProject";
import { MainLoader } from "../components/main-loader/MainLoader";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { IFormVariant } from "../models/IForm";
import { RouteNames } from "../router";
import {
    setFormVariant,
    setIsFormOpened,
} from "../store/slices/form-slice/formSlice";
import { checkProjects } from "../store/slices/projects-slice/projectsActionCreators";

export const HomePage: FC = () => {
    const { currentProject, isLoading, projects } = useAppSelector(
        state => state.projectsReducer
    );

 
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkProjects());

        dispatch(setFormVariant(IFormVariant.initialProject));
        dispatch(setIsFormOpened(true));
    }, []);

    return isLoading ? (
        <MainLoader />
    ) : projects.length ? (
        <Navigate to={`/${RouteNames.project}/${currentProject.id}`} />
    ) : (
        <FormProject />
    );
};
