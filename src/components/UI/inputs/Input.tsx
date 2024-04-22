import { ChangeEventHandler, FC } from "react";
import styles from "./Input.module.scss";

export enum InputVariant {
    text = "text",
    password = "password",
}

interface InputProps {
    type: string;
    placeholder: string;
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
}

export const Input: FC<InputProps> = props => {
    return <input className={styles.input} {...props} />;
};
