import { FC } from "react";
import { Link } from "react-router-dom";
import { RouteNames } from "../../router";
import styles from "./NotFound.module.scss";

interface NotFoundProps {
    message: string;
    status: string;
}

export const NotFound: FC<NotFoundProps> = ({ message, status }) => {
    return (
        <div className={styles.cnt}>
            <h2 className={styles.title}>{status}</h2>
            <div className={styles.message}>{message}</div>
            <Link className={styles.link} to={RouteNames.home}>
                Go home
            </Link>
        </div>
    );
};
