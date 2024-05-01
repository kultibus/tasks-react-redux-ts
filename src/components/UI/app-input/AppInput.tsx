import classNames from "classnames";
import { ChangeEventHandler, FC, InputHTMLAttributes, MouseEventHandler } from "react";
import styles from "./AppInput.module.scss";

interface AppInputProps extends InputHTMLAttributes<HTMLInputElement> {
    // name: string;
    // onChange: ChangeEventHandler<HTMLInputElement>;
    // onClick: MouseEventHandler<HTMLInputElement>;
    // placeholder: string;
    // type: string;
    // value: string;
    placeholderError: boolean;
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
