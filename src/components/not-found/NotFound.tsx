import { FC } from "react";
import {
	Link,
	useRouteError
} from "react-router-dom";
import { RouteNames } from "../../router";
import styles from "./NotFound.module.scss";

export const NotFound: FC = () => {
    const error = useRouteError();

    const statusText = (error as { statusText?: string })?.statusText;
    const status = (error as { status?: string })?.status;

    return (
        <div className={styles.cnt}>
            <h2 className={styles.title}>{status}</h2>
            <div className={styles.message}>{statusText}</div>
            <Link className={styles.link} to={RouteNames.root}>
                Go home
            </Link>
        </div>
    );
};
