import { FC, FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { useInput } from "../../../../hooks/useInput";
import { IUser } from "../../../../models/IUser";
import { AppDispatch } from "../../../../store/store";
import { BtnVariant, Button } from "../../buttons/Button";
import { Input } from "../../inputs/Input";
import styles from "./FormProject.module.scss";
import { auth, database } from "../../../../firebase";
import { ref, set } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

export enum FormProjectVariant {
    createProject = "Create new project",
    editProject = "Edit project",
    deleteProject = "Delete project",
}

interface FormProjectProps {
    variant: FormProjectVariant;
}

interface IProject {
    id: string;
    name: string;
}

export const FormProject: FC<FormProjectProps> = props => {
    const { variant } = props;

    const [project, setProject] = useState<IProject>({} as IProject);

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
    //     set(ref(database, "projects/" + id), { projectName: name });
    // }

    function writeProjectData({ id, name }: IProject) {
        set(ref(database, `projects/${auth.currentUser.uid}/${id}`), {
            projectName: name,
        });
    }

    const createNewProject = () => {
        const newProject: IProject = {
            id: Date.now().toString(),
            name: projectName.value,
        };

        setProject({ ...newProject });

        return newProject;
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formValid) return;

        writeProjectData(createNewProject());
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
                // onClick={() =>
                //     console.log(project)
                // }
                onClick={
                    () => console.log(auth.currentUser)

                    // onAuthStateChanged(auth, user => {
                    //     if (user) {
                    //         console.log(user.uid);
                    //     } else {
                    //         console.log("user is sign out");
                    //     }
                    // })
                }
            >
                test
            </Button>
        </form>
    );
};
