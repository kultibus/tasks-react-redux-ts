import { FC, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useInput } from "../../../hooks/useInput";
import { useTasks } from "../../../hooks/useTasks";
import {
	setIsFormOpened,
	setIsFormValid,
} from "../../../store/slices/formSlice";
import { setActiveTask } from "../../../store/slices/tasksSlice";
import { IFormVariant } from "../../../types/models/IForm";
import { ITask } from "../../../types/models/ITask";
import { formatDate } from "../../../utils/formatDate";
import { IBoardVariant } from "../../boards/Boards";
import { AppBtn, AppBtnVariant } from "../app-btn/AppBtn";
import { AppInput } from "../app-input/AppInput";
import { AppTextarea } from "../app-textarea/AppTextarea";
import styles from "./FormTask.module.scss";

interface FormTaskProps {}

export const FormTask: FC<FormTaskProps> = () => {
    const dispatch = useAppDispatch();

    const { variant, isValid } = useAppSelector(state => state.formReducer);

    const { activeTask } = useAppSelector(state => state.tasksReducer);

    const { activeProject } = useAppSelector(state => state.projectsReducer);

    const { createTask, deleteTask, editTask } = useTasks();

    const taskTitle = useInput(
        activeTask?.title || "",
        "Enter task title...",
        "Task title is empty!"
    );

    const taskDescription = useInput(
        activeTask?.body || "",
        "Enter task description..."
    );

    const taskExpDate = useInput(
        activeTask?.expDate
            ? formatDate.toYyyyMmDd(new Date(activeTask.expDate))
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
                    projectId: activeProject.id,
                    board: IBoardVariant.opened,
                };

                createTask(newTask);

                break;

            case IFormVariant.editTask:
                if (!isValid) return;

                const editedTask: ITask = {
                    ...activeTask,
                    title: taskTitle.value,
                    body: taskDescription.value,
                    expDate: expDate,
                };

                editTask(editedTask);

                break;

            case IFormVariant.deleteTask:
                deleteTask(activeTask);

                break;
        }

        dispatch(setIsFormOpened(false));
        dispatch(setActiveTask(null));
    };

    const handleReset = () => {
        dispatch(setIsFormOpened(false));
        dispatch(setActiveTask(null));
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            {(variant === IFormVariant.editTask ||
                variant === IFormVariant.deleteTask) && (
                <h3 className={styles.title}>
                    {variant} "{activeTask.title}" ?
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
