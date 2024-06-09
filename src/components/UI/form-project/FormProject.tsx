import { FC, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useInput } from "../../../hooks/useInput";
import { RouteNames } from "../../../router";
import {
    setIsFormOpened,
    setIsFormValid,
} from "../../../store/slices/formSlice";
import { IFormVariant } from "../../../types/models/IForm";
import { IProject } from "../../../types/models/IProject";
import { AppBtn, AppBtnVariant } from "../app-btn/AppBtn";
import { AppInput } from "../app-input/AppInput";
import styles from "./FormProject.module.scss";
import { projectsDatabaseApi } from "../../../api/api";

interface FormProjectProps {}

export const FormProject: FC<FormProjectProps> = () => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const { variant, isValid } = useAppSelector(state => state.formReducer);
    const { user } = useAppSelector(state => state.userReducer);
    const { activeProject, projects } = useAppSelector(
        state => state.projectsReducer
    );

    const { addProject, deleteProject, editProject, updateActiveKey } =
        projectsDatabaseApi(user);

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

                const newProject = {
                    name: projectName.value,
                };

                addProject(newProject);

                navigate(`/${RouteNames.project}/${newProject.name}`);

                break;

            case IFormVariant.editProject:
                if (!isValid) return;

                const editedProject: IProject = {
                    ...activeProject,
                    name: projectName.value,
                };

                editProject(editedProject);
                updateActiveKey(editedProject);

                navigate(`/${RouteNames.project}/${editedProject.name}`);

                break;

            case IFormVariant.deleteProject:
                const activeIndex = projects.findIndex(
                    p => p.id === activeProject.id
                );

                deleteProject(activeProject);

                if (projects.length > 1 && activeIndex === 0) {
                    const nextProject = projects[activeIndex + 1];

                    updateActiveKey(nextProject);

                    navigate(`/${RouteNames.project}/${nextProject.name}`);
                } else if (projects.length > 1) {
                    const pervProject = projects[activeIndex - 1];

                    updateActiveKey(pervProject);

                    navigate(`/${RouteNames.project}/${pervProject.name}`);
                } else {
                    updateActiveKey({
                        ...activeProject,
                        id: "",
                    });
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
