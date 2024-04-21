import { FC } from "react";
import styles from "./Boards.module.scss";

interface BoardsProps {}

export const Boards: FC<BoardsProps> = () => {
    return <div className={styles.boards}>boards</div>;
};
