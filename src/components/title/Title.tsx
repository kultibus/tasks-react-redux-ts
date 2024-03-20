import { FC, ReactNode } from "react";
import styles from "./Title.module.scss";

interface TitleProps {
    children: ReactNode;
}

export const Title: FC<TitleProps> = ({ children }) => {
    return <h2 className={styles.title}>{children}</h2>;
};
