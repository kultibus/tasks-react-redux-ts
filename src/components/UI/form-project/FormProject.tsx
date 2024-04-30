import { FC, FormEvent, useMemo, useState } from "react";
import { auth } from "../../../firebase";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useInput } from "../../../hooks/useInput";
import { createNewProject } from "../../../store/slices/projects-slice/actionCreators";
import styles from "./FormProject.module.scss";
import { AppBtn, AppBtnVariant } from "../app-btn/AppBtn";
import { AppInput } from "../app-input/AppInput";
import { useLocation, useNavigate } from "react-router-dom";
import { RouteNames } from "../../../router";
import { projectsSlice } from "../../../store/slices/projects-slice/projectsSlice";

export enum FormProjectVariant {
    initial = "Create new project",
    new = "Add new project",
    edit = "Edit project",
    delete = "Delete project",
}

interface FormProjectProps {
    variant: FormProjectVariant;
}

export const FormProject: FC<FormProjectProps> = props => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const { variant } = props;

    const [formValid, setFormValid] = useState<boolean>(false);

    // const { projects } = useAppSelector(state => state.projectsReducer);

    const { setIsFormOpened } = projectsSlice.actions;

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

        if (!formValid) return;

        const newProject = {
            id: Math.random().toString(36).substring(2, 9),
            name: projectName.value,
            uid: auth.currentUser.uid,
        };

        dispatch(createNewProject(newProject));

        navigate(`/${RouteNames.projects}/${newProject.id}`);

        projectName.cleanValue();

        // writeProjectData(createNewProject());
    };

    const handleReset = () => {
        // navigate(`/${RouteNames.projects}/${newProject.id}`);
        dispatch(setIsFormOpened(false));

        navigate(-1);

        projectName.cleanValue();
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

            <div className={styles.btns}>
                <AppBtn
                    type="submit"
                    variant={AppBtnVariant.form}
                    onClick={handleClick}
                >
                    {variant}
                </AppBtn>

                {variant !== FormProjectVariant.initial && (
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
