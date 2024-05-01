import { FC, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useInput } from "../../../hooks/useInput";
import { RouteNames } from "../../../router";
import {
	createNewProject,
	deleteProject,
	openForm,
} from "../../../store/slices/projects-slice/actionCreators";
import {
	IFormState
} from "../../../store/slices/projects-slice/projectsSlice";
import { AppBtn, AppBtnVariant } from "../app-btn/AppBtn";
import { AppInput } from "../app-input/AppInput";
import styles from "./FormProject.module.scss";

interface FormProjectProps {}

export const FormProject: FC<FormProjectProps> = () => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const [formValid, setFormValid] = useState<boolean>(false);

    const { projects, formState } = useAppSelector(
        state => state.projectsReducer
    );


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

        switch (formState) {
            case IFormState.initial:
            case IFormState.add:
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

            case IFormState.delete:
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
        }

        // writeProjectData(createNewProject());
    };

    const handleReset = () => {
        dispatch(openForm(false, IFormState.initial));

        navigate(-1);

        switch (formState) {
            case IFormState.initial:
            case IFormState.add:
                projectName.cleanValue();
                break;
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            {formState !== IFormState.delete && (
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
                    {formState}
                </AppBtn>

                {formState !== IFormState.initial && (
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
