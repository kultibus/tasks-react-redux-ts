import { FC, ReactNode } from "react";
import styles from "./Task.module.scss";
import { ITask } from "../../models/ITask";

interface TaskProps {
    children?: ReactNode;
    task: ITask;
}

export const Task: FC<TaskProps> = props => {
    const { task } = props;

    return <li className={styles.task}>{task.title}</li>;
};
