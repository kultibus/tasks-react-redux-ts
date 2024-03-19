import { FC, ReactNode } from "react";
import styles from "./Button.module.scss";
import classNames from "classnames";

export enum ButtonVariant {
    add = "add",
    icon = "icon",
}
export enum ButtonType {
    submit = "submit",
    button = "button",
}

interface ButtonProps {
    children: ReactNode;
    variant: ButtonVariant;
    type: ButtonType;
    onClick?: () => void;
}

export const Button: FC<ButtonProps> = props => {
    const { children, variant, type, onClick } = props;

    return (
        <button className={styles[variant]} onClick={onClick} type={type}>
            {children}
        </button>
    );
};
