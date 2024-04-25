import { FC, ReactNode } from "react";
import styles from "./HeaderLinks.module.scss";

interface HeaderLinks {
    children: ReactNode;
}

export const HeaderLinks: FC<HeaderLinks> = ({ children }) => {
    return <div className={styles.links}>{children}</div>;
};
