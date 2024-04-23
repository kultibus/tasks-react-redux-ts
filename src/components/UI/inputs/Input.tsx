import { ChangeEventHandler, FC, MouseEventHandler } from "react";
import styles from "./Input.module.scss";
import classNames from "classnames";

interface InputProps {
    name: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    onClick: MouseEventHandler<HTMLInputElement>;
    placeholder: string;
    placeholderError: boolean;
    type: string;
    value: string;
}

export const Input: FC<InputProps> = props => {
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
