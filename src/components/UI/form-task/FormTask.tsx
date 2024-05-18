import { FC, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useInput } from "../../../hooks/useInput";
import { RouteNames } from "../../../router";
import {
	setIsFormOpened,
	setIsFormValid,
} from "../../../store/slices/form-slice/formSlice";
import {
	deleteCurrentProject,
	editCurrentProject,
	updateCurrentProject
} from "../../../store/slices/projects-slice/projectsActionCreators";
import { createNewTask } from "../../../store/slices/tasks-slice/tasksActionCreators";
import { IFormVariant } from "../../../types/models/IForm";
import { IProject } from "../../../types/models/IProject";
import { ITask } from "../../../types/models/ITask";
import { formatDate } from "../../../utils/formatDate";
import { AppBtn, AppBtnVariant } from "../app-btn/AppBtn";
import { AppInput } from "../app-input/AppInput";
import { AppTextarea } from "../app-textarea/AppTextarea";
import styles from "./FormTask.module.scss";

interface FormTaskProps {}

export const FormTask: FC<FormTaskProps> = () => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const { projects, currentProject } = useAppSelector(
        state => state.projectsReducer
    );
    const { variant, isValid } = useAppSelector(state => state.formReducer);

    const taskTitle = useInput(
        "",
        "Enter task title...",
        "Task title is empty!"
    );

    const taskDescription = useInput("", "Enter task description...");

    const taskExpDate = useInput("", "Enter expiration date...");

    const handleClick = () => {
        if (!taskTitle.value.length) {
            dispatch(setIsFormValid(false));

            taskTitle.setError();
        } else {
            dispatch(setIsFormValid(true));
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        switch (variant) {
            case IFormVariant.addTask:
                if (!isValid) return;

                const expDate = taskExpDate.value
                    ? new Date(taskExpDate.value).getTime()
                    : formatDate.getTomorrow(new Date()).getTime();

                const newTask: ITask = {
                    id: Math.random().toString(36).substring(2, 9),
                    title: taskTitle.value,
                    body: taskDescription.value,
                    expDate: expDate,
                    projectId: currentProject.id,
                };

                dispatch(createNewTask(newTask));

                // navigate(`/${RouteNames.project}/${newProject.id}`);

                break;

            case IFormVariant.editTask:
                if (!isValid) return;

                const editedProject = {
                    ...currentProject,
                    name: taskTitle.value,
                };

                dispatch(editCurrentProject(editedProject));

                navigate(`/${RouteNames.project}/${editedProject.id}`);

                break;

            case IFormVariant.deleteProject:
                const currentProjectIndex = projects.findIndex(
                    project => project.id === currentProject.id
                );

                const length = projects.length;
                const pervProject = projects[currentProjectIndex - 1];
                const nextProject = projects[currentProjectIndex + 1];

                dispatch(deleteCurrentProject(projects[currentProjectIndex]));

                if (length > 1 && currentProjectIndex === 0) {
                    dispatch(updateCurrentProject(nextProject));

                    navigate(`/${RouteNames.project}/${nextProject.id}`);
                } else if (length > 1) {
                    dispatch(updateCurrentProject(pervProject));

                    navigate(`/${RouteNames.project}/${pervProject.id}`);
                } else {
                    dispatch(updateCurrentProject({} as IProject));

                    dispatch(setIsFormValid(true));

                    navigate(`/`);
                }

                break;
        }

        dispatch(setIsFormOpened(false));

        taskTitle.cleanValue();
    };

    const handleReset = () => {
        dispatch(setIsFormOpened(false));

        // navigate(-1);

        switch (variant) {
            case IFormVariant.addTask:
                taskTitle.cleanValue();
                break;
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            {variant !== IFormVariant.deleteTask && (
                <div className={styles.inputs}>
                    <AppInput
                        name="taskTitle"
                        placeholderError={taskTitle.isError}
                        onChange={taskTitle.onChange}
                        onClick={taskTitle.deleteError}
                        placeholder={taskTitle.placeholder}
                        type="text"
                        value={taskTitle.value}
                    />
                    <AppTextarea
                        name="taskDescription"
                        onChange={taskDescription.onChange}
                        placeholder={taskDescription.placeholder}
                        value={taskDescription.value}
                    />
                    <label className={styles.expDateLabel}>
                        Select an expiration date for the task:
                        <AppInput
                            name="taskExpDate"
                            onChange={taskExpDate.onChange}
                            type="date"
                            value={taskExpDate.value}
                            min={formatDate.getTomorrowYYYYMMDD(new Date())}
                        />
                    </label>
                </div>
            )}

            <div className={styles.btns}>
                <AppBtn
                    type="submit"
                    variant={AppBtnVariant.form}
                    onClick={handleClick}
                >
                    {variant}
                </AppBtn>

                <AppBtn
                    type="reset"
                    variant={AppBtnVariant.form}
                    onClick={handleReset}
                >
                    Cancel
                </AppBtn>
            </div>
        </form>
    );
};
