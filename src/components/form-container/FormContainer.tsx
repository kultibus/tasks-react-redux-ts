import { FC, ReactNode } from "react";
import styles from "./FormContainer.module.scss";

interface FormContainerProps {
    children: ReactNode;
}

export const FormContainer: FC<FormContainerProps> = ({ children }) => {
    return <div className={styles.cnt}>{children}</div>;
};
