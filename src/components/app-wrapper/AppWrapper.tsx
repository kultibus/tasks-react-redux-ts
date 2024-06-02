import { FC, ReactNode } from "react";
import styles from "./AppWrapper.module.scss";
import { useTheme } from "../../hooks/useTheme";

interface AppWrapperProps {
    children: ReactNode;
}

export const AppWrapper: FC<AppWrapperProps> = ({ children }) => {
    useTheme();

    return <div className={styles.wrapper}>{children}</div>;
};
