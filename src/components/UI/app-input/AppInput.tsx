import classNames from "classnames";
import { FC, InputHTMLAttributes, useState } from "react";
import styles from "./AppInput.module.scss";

export enum AppInputVariant {
    filter = "filter",
}

interface AppInputProps extends InputHTMLAttributes<HTMLInputElement> {
    placeholderError?: boolean;

    variant?: AppInputVariant;
}

export const AppInput: FC<AppInputProps> = props => {
    const { placeholderError, variant, ...rest } = props;

    return (
        <input
            className={classNames(styles.input, {
                [styles.filter]:
                    variant === AppInputVariant.filter ? true : false,
                [styles.error]: placeholderError,
            })}
            {...rest}
        />
    );
};
