import { FC, ReactNode } from "react";
import styles from "./AppCnt.module.scss";

interface AppCntProps {
    children: ReactNode;
}

export const AppCnt: FC<AppCntProps> = ({ children }) => {
    return <div className={styles.appCnt}>{children}</div>;
};
