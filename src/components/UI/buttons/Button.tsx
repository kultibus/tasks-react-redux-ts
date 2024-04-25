import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import styles from "./Button.module.scss";
import classNames from "classnames";

export enum BtnVariant {
    form = "form",
    icon = "icon",
    formDisabled = "formDisabled",
    header = "header",
    headerAcive = "headerAcive",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant: BtnVariant;
    disabled?: boolean;
}

export const Button: FC<ButtonProps> = props => {
    const { children, variant } = props;

    return (
        <button className={classNames(styles[variant])} {...props}>
            {children}
        </button>
    );
};
