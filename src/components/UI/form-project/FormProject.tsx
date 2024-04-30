import { FC, FormEvent, useState } from "react";
import { auth } from "../../../firebase";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useInput } from "../../../hooks/useInput";
import { createNewProject } from "../../../store/slices/projects-slice/actionCreators";
import styles from "./FormProject.module.scss";
import { AppBtn, AppBtnVariant } from "../app-btn/AppBtn";
import { AppInput } from "../app-input/AppInput";

export enum FormProjectVariant {
    createProject = "Create new project",
    editProject = "Edit project",
    deleteProject = "Delete project",
}

interface FormProjectProps {
    variant: FormProjectVariant;
}

export const FormProject: FC<FormProjectProps> = props => {
    const { variant } = props;

    const dispatch = useAppDispatch();

    const { projects } = useAppSelector(state => state.projectsReducer);

    // const { setProjects } = projectsSlice.actions;

    const projectName = useInput(
        "",
        "Enter project name...",
        "Project name is empty!"
    );

    const [formValid, setFormValid] = useState<boolean>(false);

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

        if (!formValid) return;

        dispatch(
            createNewProject(projects, {
                id: Date.now().toString(),
                name: projectName.value,
                uid: auth.currentUser.uid,
                current: true,
            })
        );

        projectName.cleanValue();

        // writeProjectData(createNewProject());
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <AppInput
                name="projectName"
                placeholderError={projectName.isError}
                onChange={projectName.onChange}
                onClick={projectName.deleteError}
                placeholder={projectName.placeholder}
                type="text"
                value={projectName.value}
            />

            <AppBtn
                type="submit"
                variant={AppBtnVariant.form}
                onClick={handleClick}
            >
                {variant}
            </AppBtn>
            <AppBtn
                type="button"
                variant={AppBtnVariant.form}
                onClick={() => console.log(projects)}
            >
                test
            </AppBtn>
        </form>
    );
};
