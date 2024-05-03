import { FC } from "react";
import { Link, useRouteError } from "react-router-dom";
import styles from "./NotFound.module.scss";

export const NotFound: FC = () => {
    const error = useRouteError();

    const message = (error as { data?: string })?.data;
    const status = (error as { status?: string })?.status;

    return (
        <div className={styles.cnt}>
            <h2 className={styles.title}>{status}</h2>
            <div className={styles.message}>{message}</div>
            <Link className={styles.link} to={"/"}>
                Go home
            </Link>
        </div>
    );
};
