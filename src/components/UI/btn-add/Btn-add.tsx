import { FC, ReactNode } from "react";
import styles from './Btn-add.module.scss'

interface BtnAddProps {
    children: ReactNode;
}

export const BtnAdd: FC<BtnAddProps> = props => {
    return <button className={styles.btn} type="button">{props.children}</button>;
};
