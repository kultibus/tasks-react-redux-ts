import { FC } from "react";
import styles from "./Header.module.scss";

interface HeaderProps {}

export const Header: FC<HeaderProps> = props => {
    return (
        <header className={styles.header}>
            <div className={styles.cnt}>
                <h1 className={styles.title}>Tasks manager</h1>
            </div>
        </header>
    );
};
