import { FC } from "react";
import { useRouteError } from "react-router-dom";
import { Button } from "../buttons/Button";
import styles from "./RegisterError.module.scss";

export const FormError: FC = () => {
    // const error = useRouteError();
    // console.error(error);

    return (
        <div className={styles.cnt}>
            <h2 className={styles.title}>Sorry, an unexpected error has occurred</h2>
            <p className={styles.item}>
                Maybe the entered email is already registered or is incorrect
            </p>
            <p className={styles.item}>Or the password entered is too weak</p>
            <Button disabled={false}>Try again</Button>
        </div>
    );
};
