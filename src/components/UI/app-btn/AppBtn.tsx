import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import styles from "./AppBtn.module.scss";
import classNames from "classnames";
import { useAppSelector } from "../../../hooks/redux";

export enum AppBtnVariant {
    form = "form",
    icon = "icon",
    iconTopBar = "iconTopBar",
    formDisabled = "formDisabled",
    header = "header",
    headerAcive = "headerAcive",
}

interface AppBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant: AppBtnVariant;
    // disabled?: boolean;
}

export const AppBtn: FC<AppBtnProps> = props => {
    const { children, variant, ...rest } = props;

    const { isLoading } = useAppSelector(state => state.authReducer);

    return (
        <button
            className={classNames(styles[variant])}
            {...rest}
        >
            {children}
        </button>
    );
};
