import { FC, ReactNode } from "react";
import styles from "./AppWrapper.module.scss";

interface AppWrapperProps {
    children: ReactNode;
}

export const AppWrapper: FC<AppWrapperProps> = ({ children }) => {
    return <div className={styles.wrapper}>{children}</div>;
};
