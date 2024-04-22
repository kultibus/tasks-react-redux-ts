import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import styles from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;

}

export const Button: FC<ButtonProps> = props => {
    const { children } = props;

    return (
        <button className={styles.btn} {...props}>
            {children}
        </button>
    );
};
