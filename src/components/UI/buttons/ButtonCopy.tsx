import { FC, ReactNode } from "react";
import styles from "./Button.module.scss";
import classNames from "classnames";

export enum ButtonVariant {
    add = "add",
    icon = "icon",
    list = "list",
    hidden = "hidden",
    active = "active",
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
    onMouseDown?: () => void;
}

export const Button: FC<ButtonProps> = props => {
    const { children, variant, type, onClick, onMouseDown } = props;

    return (
        <button
            className={classNames(styles.btn, styles[variant])}
            onClick={onClick}
            onMouseDown={onMouseDown}
            type={type}
        >
            {children}
        </button>
    );
};
