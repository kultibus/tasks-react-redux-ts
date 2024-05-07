import { FC, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useInput } from "../../../hooks/useInput";
import { IFormVariant } from "../../../models/IForm";
import { RouteNames } from "../../../router";
import {
    createNewProject,
    deleteCurrentProject,
    editCurrentProject,
    setCurrentProject,
} from "../../../store/slices/projects-slice/projectsActionCreators";
import { AppBtn, AppBtnVariant } from "../app-btn/AppBtn";
import { AppInput } from "../app-input/AppInput";
import styles from "./FormProject.module.scss";
import {
    setFormVariant,
    setIsFormOpened,
    setIsFormValid,
} from "../../../store/slices/form-slice/formSlice";
import { auth } from "../../../firebase";
import { FormContainer } from "../../form-container/FormContainer";
import { IProject } from "../../../models/IProject";

interface FormProjectProps {}

export const FormProject: FC<FormProjectProps> = () => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const { projects, currentProject } = useAppSelector(
        state => state.projectsReducer
    );
    const { variant, isValid } = useAppSelector(state => state.formReducer);

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
                    uid: auth.currentUser.uid,
                };

                dispatch(createNewProject(newProject));

                navigate(`/${RouteNames.projects}/${newProject.id}`);

                break;

            case IFormVariant.editProject:
                if (!isValid) return;

                const editedProject = {
                    ...currentProject,
                    name: projectName.value,
                };

                dispatch(editCurrentProject(editedProject));

                navigate(`/${RouteNames.projects}/${editedProject.id}`);

                // projectName.cleanValue();

                break;

            case IFormVariant.deleteProject:
                const currentProjectIndex = projects.findIndex(
                    project => project.id === currentProject.id
                );

                // console.log(currentProjectIndex)

                const length = projects.length;
                const pervProject = projects[currentProjectIndex - 1];
                const nextProject = projects[currentProjectIndex + 1];

                dispatch(deleteCurrentProject(projects[currentProjectIndex]));

                if (length > 1 && currentProjectIndex === 0) {
                    dispatch(setCurrentProject(nextProject));

                    navigate(`/${RouteNames.projects}/${nextProject.id}`);
                } else if (length > 1) {
                    dispatch(setCurrentProject(pervProject));

                    navigate(`/${RouteNames.projects}/${pervProject.id}`);
                } else {
                    dispatch(setCurrentProject({} as IProject));

                    dispatch(setFormVariant(IFormVariant.initial));
                    dispatch(setIsFormValid(true));

                    navigate(`/${RouteNames.projects}`);
                }

                break;
        }

        dispatch(setIsFormOpened(false));

        projectName.cleanValue();

        // writeProjectData(createNewProject());
    };

    const handleReset = () => {
        dispatch(setIsFormOpened(false));

        navigate(-1);

        switch (variant) {
            case IFormVariant.initial:
            case IFormVariant.addProject:
                projectName.cleanValue();
                break;
        }
    };

    return (
        <FormContainer>
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
        </FormContainer>
    );
};
