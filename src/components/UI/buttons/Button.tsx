import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import styles from "./Button.module.scss";
import classNames from "classnames";



interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    disabled?: boolean;
}

export const Button: FC<ButtonProps> = props => {
    const { children, disabled } = props;

    return (
        <button
            className={classNames(styles.btn, { [styles.disabled]: disabled })}
            {...props}
        >
            {children}
        </button>
    );
};
