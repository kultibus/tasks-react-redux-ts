import { ChangeEventHandler, FC, ReactNode } from "react";
import styles from "./Input.module.scss";
import classNames from "classnames";

export enum InputType {
    text = "text",
}

interface InputProps {
    type: InputType;
    placeholder: string;
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    onBlur: ChangeEventHandler<HTMLInputElement>;
    inputValid: boolean;
    onClick: () => void;
}

export const Input: FC<InputProps> = props => {
    const { inputValid, ...restProps } = props;

    return (
        <input
            className={classNames(styles.input, {
                [styles.error]: !inputValid,
            })}
            {...restProps}
            maxLength={30}
        />
    );
};
