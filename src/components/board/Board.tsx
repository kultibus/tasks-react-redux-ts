import { FC, ReactNode } from "react";
import styles from "./Board.module.scss";

interface BoardProps {
    children: ReactNode;
}

export const Board: FC<BoardProps> = ({ children }) => {
    return <li className={styles.board}>{children}</li>;
};
