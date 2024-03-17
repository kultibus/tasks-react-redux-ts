import { FC, ReactNode } from "react";
import styles from './btn-add.module.scss'

interface BtnAddProps {
    children: ReactNode;
}

export const BtnAdd: FC<BtnAddProps> = props => {
    return <button type="button">{props.children}</button>;
};
