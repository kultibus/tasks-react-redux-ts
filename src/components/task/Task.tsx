import classNames from "classnames";
import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
    setFormVariant,
    setIsFormOpened,
} from "../../store/slices/form-slice/formSlice";
import { updateActiveTask } from "../../store/slices/tasks-slice/tasksActionCreators";
import { IFormVariant } from "../../types/models/IForm";
import { ITask } from "../../types/models/ITask";
import { formatDate } from "../../utils/formatDate";
import {
    EditDelBtns,
    EditDelBtnsVariant,
} from "../UI/edit-del-btns/EditDelBtns";
import styles from "./Task.module.scss";
import { IBoards } from "../../types/types";
import { IBoardVariant } from "../boards/Boards";

interface TaskProps {
    task: ITask;
    board: IBoardVariant;
}

export const Task: FC<TaskProps> = props => {
    const { task, board } = props;

    const dispatch = useAppDispatch();

    const [daysLeft, setDaysLeft] = useState<number>(
        formatDate.getDaysLeft(task.expDate)
    );

    useEffect(() => {
        setDaysLeft(formatDate.getDaysLeft(task.expDate));
    }, []);

    const handleTask = () => {
        dispatch(updateActiveTask(task.id));
        dispatch(setIsFormOpened(true));
    };

    const handleDelTask = () => {
        handleTask();
        dispatch(setFormVariant(IFormVariant.deleteTask));
    };

    const handleEditTask = () => {
        handleTask();
        dispatch(setFormVariant(IFormVariant.editTask));
    };

    return (
        <li className={classNames(styles.task)}>
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
        </li>
    );
};
