import { FC, ReactNode, useEffect, useState } from "react";
import styles from "./Task.module.scss";
import { ITask } from "../../types/models/ITask";
import {
    EditDelBtns,
    EditDelBtnsVariant,
} from "../UI/edit-del-btns/EditDelBtns";
import { formatDate } from "../../utils/formatDate";
import classNames from "classnames";

interface TaskProps {
    children?: ReactNode;
    task: ITask;
}

export const Task: FC<TaskProps> = props => {
    const { task } = props;

    const [daysLeft, setDaysLeft] = useState<number>(0);

    useEffect(() => {
        setDaysLeft(formatDate.getDaysLeft(task.expDate));
    }, [task]);

    return (
        <li className={styles.task}>
            <div className={styles.top}>
                <div className={styles.title}>
                    <h3>{task.title}</h3>
                </div>
                <EditDelBtns
                    handleDelBtn={() => []}
                    handleEditBtn={() => []}
                    variant={EditDelBtnsVariant.task}
                />
            </div>
            {task.body && <p className={styles.body}>{task.body}</p>}
            <div className={styles.bottom}>
                Days to completion:{" "}
                <span
                    className={classNames(styles.daysLeft, {
                        [styles.warning]: daysLeft <= 7,
                        [styles.expires]: daysLeft <= 3,
                    })}
                >
                    {daysLeft}
                </span>
            </div>
        </li>
    );
};
