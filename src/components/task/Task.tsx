import { FC, MouseEvent, ReactNode, useEffect, useState } from "react";
import styles from "./Task.module.scss";
import { ITask } from "../../types/models/ITask";
import {
    EditDelBtns,
    EditDelBtnsVariant,
} from "../UI/edit-del-btns/EditDelBtns";
import { formatDate } from "../../utils/formatDate";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
    setFormVariant,
    setIsFormOpened,
} from "../../store/slices/form-slice/formSlice";
import { IFormVariant } from "../../types/models/IForm";
import { updateCurrentTask } from "../../store/slices/tasks-slice/tasksActionCreators";
import { useDraggable } from "@dnd-kit/core";

interface TaskProps {
    task: ITask;
}

export const Task: FC<TaskProps> = props => {
    const { task } = props;

    const { tasks } = useAppSelector(state => state.tasksReducer);

    const dispatch = useAppDispatch();

    const [daysLeft, setDaysLeft] = useState<number>(0);

    useEffect(() => {
        setDaysLeft(formatDate.getDaysLeft(task.expDate));
    }, [task]);

    const handleDelTask = (e: MouseEvent<HTMLButtonElement>) => {
        const taskId = e.currentTarget.closest("li").dataset.taskId;

        dispatch(updateCurrentTask(tasks.find(task => task.id === taskId)));

        dispatch(setIsFormOpened(true));
        dispatch(setFormVariant(IFormVariant.deleteTask));
    };

    const handleEditTask = (e: MouseEvent<HTMLButtonElement>) => {
        const taskId = e.currentTarget.closest("li").dataset.taskId;

        dispatch(updateCurrentTask(tasks.find(task => task.id === taskId)));

        dispatch(setIsFormOpened(true));
        dispatch(setFormVariant(IFormVariant.editTask));
    };

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task.id,
    });
    const style = transform
        ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
              backgroundColor: `var(--main-300-full)`,
              cursor: `grabbing`,
          }
        : undefined;

    return (
        <li
            ref={setNodeRef}
            data-task-id={task.id}
            style={style}
            className={styles.task}
            {...listeners}
            {...attributes}
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
                    {daysLeft}
                </span>
            </div>
        </li>
    );
};
