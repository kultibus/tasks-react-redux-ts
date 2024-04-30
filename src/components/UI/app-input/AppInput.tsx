import { ChangeEventHandler, FC, MouseEventHandler } from "react";
import styles from "./AppInput.module.scss";
import classNames from "classnames";

interface AppInputProps {
    name: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    onClick: MouseEventHandler<HTMLInputElement>;
    placeholder: string;
    placeholderError: boolean;
    type: string;
    value: string;
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
