import { FC, ReactNode } from "react";
import styles from "./buttons.module.scss";

interface BtnAddProps {
    children: ReactNode;
}

export const BtnAdd: FC<BtnAddProps> = props => {
    const { children } = props;

    return (
        <button className={styles.add} type="button">
            {children}
        </button>
    );
};
