import classNames from "classnames";
import { FC, MouseEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
    setFormVariant,
    setIsFormOpened,
} from "../../store/slices/form-slice/formSlice";
import { updateCurrentTask } from "../../store/slices/tasks-slice/tasksActionCreators";
import { IFormVariant } from "../../types/models/IForm";
import { ITask } from "../../types/models/ITask";
import { formatDate } from "../../utils/formatDate";
import {
    EditDelBtns,
    EditDelBtnsVariant,
} from "../UI/edit-del-btns/EditDelBtns";
import styles from "./Task.module.scss";

interface TaskProps {
    task: ITask;
    isDragging?: boolean;
}

export const Task: FC<TaskProps> = props => {
    const { task, isDragging } = props;

    const { tasks } = useAppSelector(state => state.tasksReducer);

    const dispatch = useAppDispatch();

    const [daysLeft, setDaysLeft] = useState<number>(
        formatDate.getDaysLeft(task.expDate)
    );

    useEffect(() => {
        setDaysLeft(formatDate.getDaysLeft(task.expDate));
    }, []);

    const handleDelTask = () => {
        const taskId = task.id;

        // dispatch(updateCurrentTask(tasks.find(task => task.id === taskId)));

        dispatch(setIsFormOpened(true));
        dispatch(setFormVariant(IFormVariant.deleteTask));
    };

    const handleEditTask = () => {
        const taskId = task.id;

        // dispatch(updateCurrentTask(tasks.find(task => task.id === taskId)));

        dispatch(setIsFormOpened(true));
        dispatch(setFormVariant(IFormVariant.editTask));
    };

    return (
        <div
            className={classNames(styles.task, {
                [styles.taskDragging]: isDragging,
            })}
        >
            <div className={styles.top}>
                <div className={styles.title}>
                    <h3>{task.title}</h3>
                </div>
                <EditDelBtns
                    handleDelBtn={handleDelTask}
                    handleEditBtn={handleEditTask}
                    variant={EditDelBtnsVariant.task}
                />
            </div>
            {task.body && <p className={styles.body}>{task.body}</p>}
            <div className={styles.bottom}>
                <span>Days left to complete:</span>
                <span
                    className={classNames(styles.daysLeft, {
                        [styles.warning]: daysLeft < 7,
                        [styles.expires]: daysLeft < 3,
                    })}
                >
                    {daysLeft < 0 ? "0" : daysLeft}
                </span>
            </div>
        </div>
    );
};
