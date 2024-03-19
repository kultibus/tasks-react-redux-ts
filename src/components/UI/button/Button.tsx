import { FC, ReactNode } from "react";
import styles from "./Button.module.scss";
import classNames from "classnames";

export enum ButtonVariant {
    add = "add",
    icon = "icon",
}

interface ButtonProps {
    children: ReactNode;
    onClick?: () => void;
    variant: ButtonVariant;
}

export const Button: FC<ButtonProps> = props => {
    const { children, onClick, variant } = props;

    return (
        <button
            className={classNames("btn-add", styles[variant])}
            onClick={onClick}
            
        >
            {children}
        </button>
    );
};
