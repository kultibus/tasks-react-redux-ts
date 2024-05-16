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

export const HomePage: FC = () => {
    const { currentProject, projects } = useAppSelector(
        state => state.projectsReducer
    );

    const isProjects = projects?.length;

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setFormVariant(IFormVariant.initialProject));
        dispatch(setIsFormOpened(true));
    }, [dispatch]);

    return isProjects ? (
        <Navigate to={`/${RouteNames.project}/${currentProject.id}`} />
    ) : (
        <FormProject />
    );
};
