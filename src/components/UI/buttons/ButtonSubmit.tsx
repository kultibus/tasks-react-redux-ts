import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import styles from "./ButtonSubmit.module.scss";

interface ButtonSubmitProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;

}

export const ButtonSubmit: FC<ButtonSubmitProps> = props => {
    const { children } = props;

    return (
        <button className={styles.btn} {...props}>
            {children}
        </button>
    );
};
