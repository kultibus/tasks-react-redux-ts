import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import styles from "./AppBtn.module.scss";
import classNames from "classnames";

export enum AppBtnVariant {
    form = "form",
    icon = "icon",
    topBar = "topBar",
    task = "task",
    formDisabled = "formDisabled",
    header = "header",
    headerAcive = "headerAcive",
}

interface AppBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant: AppBtnVariant;
}

export const AppBtn: FC<AppBtnProps> = props => {
    const { children, variant, ...rest } = props;


    return (
        <button
            className={classNames(styles[variant])}
            {...rest}
        >
            {children}
        </button>
    );
};
