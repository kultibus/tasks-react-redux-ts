import { FC, ReactNode } from "react";
import styles from "./MainCnt.module.scss";

interface MainCntProps {
    children: ReactNode;
}

export const MainCnt: FC<MainCntProps> = ({ children }) => {
    return <div className={styles.mainCnt}>{children}</div>;
};
