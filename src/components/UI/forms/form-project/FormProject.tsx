import { FC, FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { useInput } from "../../../../hooks/useInput";
import { IUser } from "../../../../models/IUser";
import { AppDispatch } from "../../../../store/store";
import { BtnVariant, Button } from "../../buttons/Button";
import { Input } from "../../inputs/Input";
import styles from "./FormProject.module.scss";

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

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formValid) return;
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
        </form>
    );
};
