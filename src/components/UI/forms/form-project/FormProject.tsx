import { ref, set } from "firebase/database";
import { FC, FormEvent, useState } from "react";
import { auth, database } from "../../../../firebase";
import { useInput } from "../../../../hooks/useInput";
import { BtnVariant, Button } from "../../buttons/Button";
import { Input } from "../../inputs/Input";
import styles from "./FormProject.module.scss";
import { IProject } from "../../../../models/IProject";
import { authSlice } from "../../../../store/slices/authSlice/authSlice";
import { projectsSlice } from "../../../../store/slices/projectsSlice/projectsSlice";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { createNewProject } from "../../../../store/slices/projectsSlice/actionCreators";

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
            })
        );

        projectName.cleanValue();

        // writeProjectData(createNewProject());
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <Input
                name="projectName"
                placeholderError={projectName.isError}
                onChange={projectName.onChange}
                onClick={projectName.deleteError}
                placeholder={projectName.placeholder}
                type="text"
                value={projectName.value}
            />

            <Button
                type="submit"
                variant={BtnVariant.form}
                onClick={handleClick}
            >
                {variant}
            </Button>
            <Button
                type="button"
                variant={BtnVariant.form}
                onClick={() => console.log(projects)}
            >
                test
            </Button>
        </form>
    );
};
