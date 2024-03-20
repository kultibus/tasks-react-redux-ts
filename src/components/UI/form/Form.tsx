import { FC, FormEventHandler, ReactNode } from "react";
import styles from "./Form.module.scss";


interface FormProps {
    children: ReactNode;
    onSubmit: FormEventHandler<HTMLFormElement>;
}

export const Form: FC<FormProps> = props => {
    const { children, onSubmit } = props;

    return (
        <form onSubmit={onSubmit} className={styles.form}>
            {children}
        </form>
    );
};
