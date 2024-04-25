import { FC, ReactNode } from "react";
import styles from "./Task.module.scss";

interface TaskProps {
    children: ReactNode;
}

export const Task: FC<TaskProps> = ({ children }) => {
    return <li className={styles.task}>{children}</li>;
};
