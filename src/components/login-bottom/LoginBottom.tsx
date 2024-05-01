import { FC } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import { RouteNames } from "../../router";
import styles from "./LoginBottom.module.scss";

export const LoginBottom: FC = () => {
    // const dispatch = useAppDispatch();

    // const handleClick = () => {
    //     dispatch(setError(""));
    // };

    return (
        <div className={styles.bottom}>
            <p className={styles.text}>Not registered yet?</p>
            <Link
                onClick={() => {}}
                to={`/${RouteNames.register}`}
                className={styles.link}
            >
                Sign up
            </Link>
        </div>
    );
};
