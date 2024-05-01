import { FC, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useInput } from "../../../hooks/useInput";
import { IFormVariant } from "../../../models/IForm";
import { RouteNames } from "../../../router";
import {
    setIsValidProjectsForm,
    toggleProjectsForm,
} from "../../../store/slices/form-projects-slice/formProjectsActionCreators";
import {
    createNewProject,
    deleteCurrentProject,
    editCurrentProject,
} from "../../../store/slices/projects-slice/projectsActionCreators";
import { AppBtn, AppBtnVariant } from "../app-btn/AppBtn";
import { AppInput } from "../app-input/AppInput";
import styles from "./FormProject.module.scss";

interface FormProjectProps {}

export const FormProject: FC<FormProjectProps> = () => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const { projects } = useAppSelector(state => state.projectsReducer);
    const { variant, isValid } = useAppSelector(
        state => state.formProjectsReducer
    );

    const projectName = useInput(
        "",
        "Enter project name...",
        "Project name is empty!"
    );

    const handleClick = () => {
        if (!projectName.value.length) {
            dispatch(setIsValidProjectsForm({ isValid: false }));

            projectName.setError();
        } else {
            dispatch(setIsValidProjectsForm({ isValid: true }));
        }
    };

    // function writeProjectData({ id, name }: IProject) {
    //     set(ref(database, `projects/${auth.currentUser.uid}/${id}`), {
    //         projectName: name,
    //     });
    // }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        switch (variant) {
            case IFormVariant.initial:
            case IFormVariant.addProject:
                if (!isValid) return;

                const newProject = {
                    id: Math.random().toString(36).substring(2, 9),
                    name: projectName.value,
                    // uid: auth.currentUser.uid,
                };

                dispatch(createNewProject(newProject));

                navigate(`/${RouteNames.projects}/${newProject.id}`);

                projectName.cleanValue();

                break;

            case IFormVariant.editProject:
                if (!isValid) return;

                const currentProject = {
                    ...projects.find(project => project.current),
                    name: projectName.value,
                };

                dispatch(editCurrentProject(currentProject));

                navigate(`/${RouteNames.projects}/${currentProject.id}`);

                projectName.cleanValue();

                break;

            case IFormVariant.deleteProject:
                const currentProjectIndex = projects.findIndex(
                    project => project.current
                );

                const length = projects.length;
                const pervProject = projects[currentProjectIndex - 1];
                const nextProject = projects[currentProjectIndex + 1];

                if (length > 1 && currentProjectIndex === 0) {
                    dispatch(deleteCurrentProject(nextProject));

                    navigate(`/${RouteNames.projects}/${nextProject.id}`);
                } else if (length > 1) {
                    dispatch(deleteCurrentProject(pervProject));

                    navigate(`/${RouteNames.projects}/${pervProject.id}`);
                } else {
                    dispatch(deleteCurrentProject(null));

                    navigate(RouteNames.home);
                }

                break;
        }
        dispatch(
            toggleProjectsForm({
                isOpened: false,
                variant: IFormVariant.initial,
            })
        );

        // writeProjectData(createNewProject());
    };

    const handleReset = () => {
        dispatch(
            toggleProjectsForm({
                isOpened: false,
                variant: IFormVariant.initial,
            })
        );

        navigate(-1);

        switch (variant) {
            case IFormVariant.initial:
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

                {variant !== IFormVariant.initial && (
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
