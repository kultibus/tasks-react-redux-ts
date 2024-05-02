import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../router";
import styles from "./NotFound.module.scss";
import { AppBtn, AppBtnVariant } from "../UI/app-btn/AppBtn";

interface NotFoundProps {
    message: string;
    status: string;
}

export const NotFound: FC<NotFoundProps> = ({ message, status }) => {
    // const navigate = useNavigate();

    return (
        <div className={styles.cnt}>
            <h2 className={styles.title}>{status}</h2>
            <div className={styles.message}>{message}</div>
            <Link className={styles.link} to={RouteNames.home}>
                Go back
            </Link>
            {/* <AppBtn
                onClick={() => navigate(-1)}
                variant={AppBtnVariant.form}
                className={styles.link}
            >
                Go back
            </AppBtn> */}
        </div>
    );
};
