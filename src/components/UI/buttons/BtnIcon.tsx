import { FC, ReactNode } from "react";
import styles from "./buttons.module.scss";

interface BtnIconProps {
    children: ReactNode;
    clickHandler: () => void;
}

export const BtnIcon: FC<BtnIconProps> = props => {
    const { children, clickHandler } = props;

    return (
        <button className={styles.icon} onClick={clickHandler} type="button">
            {children}
        </button>
    );
};
