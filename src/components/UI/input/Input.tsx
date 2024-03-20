import { ChangeEventHandler, FC, ReactNode } from "react";
import styles from "./Input.module.scss";
import classNames from "classnames";
import { InputValidate } from "../../../types/types";

export enum InputType {
    text = "text",
}

interface InputProps {
    type: InputType;
    placeholder: string;
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    validate: InputValidate;
    onClick: () => void;
}

export const Input: FC<InputProps> = props => {
    const { validate, ...restProps } = props;

    return (
        <input
            className={classNames(styles.input, {
                [styles.error]: !validate,
            })}
            {...restProps}
            maxLength={30}
        />
    );
};
