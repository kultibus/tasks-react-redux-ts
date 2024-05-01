import { FC, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useInput } from "../../../hooks/useInput";
import { RouteNames } from "../../../router";
import {
    createNewProject,
    deleteProject,
    editProject,
    openForm,
} from "../../../store/slices/projects-slice/projectsActionCreators";
import { IFormState } from "../../../models/IForm";
import { AppBtn, AppBtnVariant } from "../app-btn/AppBtn";
import { AppInput } from "../app-input/AppInput";
import styles from "./FormProject.module.scss";

interface FormProjectProps {}

export const FormProject: FC<FormProjectProps> = () => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const [formValid, setFormValid] = useState<boolean>(false);

    const { projects, form } = useAppSelector(state => state.projectsReducer);

    const projectName = useInput(
        "",
        "Enter project name...",
        "Project name is empty!"
    );

    const handleClick = () => {
        if (!projectName.value.length) {
            setFormValid(false);
            projectName.setError();
        } else {
            setFormValid(true);
        }
    };

    // function writeProjectData({ id, name }: IProject) {
    //     set(ref(database, `projects/${auth.currentUser.uid}/${id}`), {
    //         projectName: name,
    //     });
    // }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        switch (form.state) {
            case IFormState.initial:
            case IFormState.addProject:
                if (!formValid) return;

                const newProject = {
                    id: Math.random().toString(36).substring(2, 9),
                    name: projectName.value,
                    // uid: auth.currentUser.uid,
                };

                dispatch(createNewProject(newProject));

                navigate(`/${RouteNames.projects}/${newProject.id}`);

                projectName.cleanValue();

                break;

            case IFormState.deleteProject:
                const currentProjectIndex = projects.findIndex(
                    project => project.current
                );

                const length = projects.length;
                const pervProject = projects[currentProjectIndex - 1];
                const nextProject = projects[currentProjectIndex + 1];

                if (length > 1 && currentProjectIndex === 0) {
                    dispatch(deleteProject(nextProject));

                    navigate(`/${RouteNames.projects}/${nextProject.id}`);
                } else if (length > 1) {
                    dispatch(deleteProject(pervProject));

                    navigate(`/${RouteNames.projects}/${pervProject.id}`);
                } else {
                    dispatch(deleteProject(null));

                    navigate(RouteNames.home);
                }

                break;
            case IFormState.editProject:
                if (!formValid) return;

                const currentProject = {
                    ...projects.find(project => project.current),
                    name: projectName.value,
                };

                dispatch(editProject(currentProject));

                navigate(`/${RouteNames.projects}/${currentProject.id}`);

                projectName.cleanValue();

                break;
        }

        // writeProjectData(createNewProject());
    };

    const handleReset = () => {
        dispatch(openForm(false, IFormState.initial));

        navigate(-1);

        switch (form.state) {
            case IFormState.initial:
            case IFormState.addProject:
                projectName.cleanValue();
                break;
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            {form.state !== IFormState.deleteProject && (
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
                    {form.state}
                </AppBtn>

                {form.state !== IFormState.initial && (
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
