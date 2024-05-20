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
    updateCurrentProject,
} from "../../../store/slices/projects-slice/projectsActionCreators";
import {
    createNewTask,
    deleteTask,
    editTask,
} from "../../../store/slices/tasks-slice/tasksActionCreators";
import { IFormVariant } from "../../../types/models/IForm";
import { IProject } from "../../../types/models/IProject";
import { ITask, ITaskState } from "../../../types/models/ITask";
import { formatDate } from "../../../utils/formatDate";
import { AppBtn, AppBtnVariant } from "../app-btn/AppBtn";
import { AppInput } from "../app-input/AppInput";
import { AppTextarea } from "../app-textarea/AppTextarea";
import styles from "./FormTask.module.scss";
import { setCurrentTask } from "../../../store/slices/tasks-slice/tasksSlice";

interface FormTaskProps {}

export const FormTask: FC<FormTaskProps> = () => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const { projects, currentProject } = useAppSelector(
        state => state.projectsReducer
    );
    const { variant, isValid } = useAppSelector(state => state.formReducer);
    const { currentTask } = useAppSelector(state => state.tasksReducer);

    const taskTitle = useInput(
        currentTask?.title || "",
        "Enter task title...",
        "Task title is empty!"
    );

    const taskDescription = useInput(
        currentTask?.body || "",
        "Enter task description..."
    );

    const taskExpDate = useInput(
        currentTask?.expDate
            ? formatDate.toYyyyMmDd(new Date(currentTask.expDate))
            : "",
        "Enter expiration date..."
    );

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

        const expDate = taskExpDate.value
            ? new Date(taskExpDate.value).getTime()
            : formatDate.getTomorrow(Date.now()).getTime();

        switch (variant) {
            case IFormVariant.addTask:
                if (!isValid) return;

                const newTask: ITask = {
                    id: Math.random().toString(36).substring(2, 9),
                    title: taskTitle.value,
                    body: taskDescription.value,
                    expDate: expDate,
                    state: ITaskState.opened,
                    projectId: currentProject.id,
                };

                dispatch(createNewTask(newTask));

                break;

            case IFormVariant.editTask:
                if (!isValid) return;

                const editedTask: ITask = {
                    ...currentTask,
                    title: taskTitle.value,
                    body: taskDescription.value,
                    expDate: expDate,
                };

                dispatch(editTask(editedTask));

                break;

            case IFormVariant.deleteTask:
                dispatch(deleteTask(currentTask));

                break;
        }

        dispatch(setIsFormOpened(false));

        // taskTitle.cleanValue();
    };

    const handleReset = () => {
        dispatch(setIsFormOpened(false));
        dispatch(setCurrentTask({} as ITask));

        // switch (variant) {
        //     case IFormVariant.addTask:
        //         taskTitle.cleanValue();
        //         break;
        // }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            {(variant === IFormVariant.editTask ||
                variant === IFormVariant.deleteTask) && (
                <h3 className={styles.title}>
                    {variant} "{currentTask.title}" ?
                </h3>
            )}

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
                            min={formatDate.toYyyyMmDd(
                                formatDate.getTomorrow(Date.now())
                            )}
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
