import classNames from "classnames";
import { FC, InputHTMLAttributes } from "react";
import styles from "./AppInput.module.scss";

interface AppInputProps extends InputHTMLAttributes<HTMLInputElement> {
    placeholderError?: boolean;
}

export const AppInput: FC<AppInputProps> = props => {
    const { placeholderError, ...rest } = props;

    return (
        <input
            className={classNames(styles.input, {
                [styles.error]: placeholderError,
            })}
            {...rest}
        />
    );
};
