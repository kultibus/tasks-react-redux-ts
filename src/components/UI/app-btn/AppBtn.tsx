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
    draggble = "draggble",
}

interface AppBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant: AppBtnVariant;
    isDragging?: boolean;
}

export const AppBtn: FC<AppBtnProps> = props => {
    const { isDragging, children, variant, ...rest } = props;

    return (
        <button
            className={classNames(styles[variant], {
                [styles.dragging]: isDragging,
            })}
            {...rest}
        >
            {children}
        </button>
    );
};
