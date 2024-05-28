import { FC, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useInput } from "../../../hooks/useInput";
import { IFormVariant } from "../../../types/models/IForm";
import { IProject } from "../../../types/models/IProject";
import { RouteNames } from "../../../router";
import {
    setFormVariant,
    setIsFormOpened,
    setIsFormValid,
} from "../../../store/slices/form-slice/formSlice";
import {
    createProject,
    deleteProject,
    updateProjects,
} from "../../../store/slices/projects-slice/projectsActionCreators";
import { AppBtn, AppBtnVariant } from "../app-btn/AppBtn";
import { AppInput } from "../app-input/AppInput";
import styles from "./FormProject.module.scss";
import { useProjects } from "../../../hooks/useProjects";

interface FormProjectProps {}

export const FormProject: FC<FormProjectProps> = () => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const { projects } = useAppSelector(state => state.projectsReducer);
    const { variant, isValid } = useAppSelector(state => state.formReducer);

    const activeProject = useProjects();

    const projectName = useInput(
        "",
        "Enter project name...",
        "Project name is empty!"
    );

    const handleClick = () => {
        if (!projectName.value.length) {
            dispatch(setIsFormValid(false));

            projectName.setError();
        } else {
            dispatch(setIsFormValid(true));
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        switch (variant) {
            case IFormVariant.initialProject:
            case IFormVariant.addProject:
                if (!isValid) return;

                const newProject: IProject = {
                    id: Math.random().toString(36).substring(2, 9),
                    name: projectName.value,
                    isActive: true,
                };

                dispatch(createProject(newProject));

                navigate(`/${RouteNames.project}/${newProject.id}`);

                break;

            case IFormVariant.editProject:
                if (!isValid) return;

                const editedProject: IProject = {
                    ...activeProject,
                    name: projectName.value,
                };

                dispatch(updateProjects(editedProject));

                navigate(`/${RouteNames.project}/${editedProject.id}`);

                break;

            case IFormVariant.deleteProject:
                const activeIndex = projects.findIndex(
                    p => p.id === activeProject.id
                );

                const length = projects.length;
                const pervProject = projects[activeIndex - 1];
                const nextProject = projects[activeIndex + 1];

                dispatch(deleteProject(projects[activeIndex]));

                if (length > 1 && activeIndex === 0) {
                    dispatch(updateProjects(nextProject));

                    navigate(`/${RouteNames.project}/${nextProject.id}`);
                } else if (length > 1) {
                    dispatch(updateProjects(pervProject));

                    navigate(`/${RouteNames.project}/${pervProject.id}`);
                } else {
                    dispatch(updateProjects({} as IProject));

                    dispatch(setIsFormValid(true));

                    navigate(`/`);
                }

                break;
        }

        dispatch(setIsFormOpened(false));

        projectName.cleanValue();
    };

    const handleReset = () => {
        dispatch(setIsFormOpened(false));

        navigate(-1);

        switch (variant) {
            case IFormVariant.initialProject:
            case IFormVariant.addProject:
                projectName.cleanValue();
                break;
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            {variant !== IFormVariant.deleteProject && (
                <AppInput
                    name="projectName"
                    placeholderError={projectName.isError}
                    onChange={projectName.onChange}
                    onClick={projectName.deleteError}
                    placeholder={projectName.placeholder}
                    type="text"
                    value={projectName.value}
                />
            )}

            <div className={styles.btns}>
                <AppBtn
                    type="submit"
                    variant={AppBtnVariant.form}
                    onClick={handleClick}
                >
                    {variant}
                </AppBtn>

                {variant !== IFormVariant.initialProject && (
                    <AppBtn
                        type="reset"
                        variant={AppBtnVariant.form}
                        onClick={handleReset}
                    >
                        Cancel
                    </AppBtn>
                )}
            </div>
        </form>
    );
};
