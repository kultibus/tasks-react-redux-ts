import { FC } from "react";
import { ITask } from "../../types/types";
import styles from "./Task.module.scss";

export const Task: FC<ITask> = props => {
    const { title, description } = props;

    return (
        <div className={styles.task}>
            <h4>{title}</h4>
            <p>{description}</p>
        </div>
    );
};
