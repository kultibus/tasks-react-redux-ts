import { FC } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/redux";
import { RouteNames } from "../../../router";
import { authSlice } from "../../../store/slices/authSlice/authSlice";
import styles from "./FormBottom.module.scss";

export const FormBottom: FC = () => {
    const { setError } = authSlice.actions;

    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(setError(""));
    };

    return (
        <div className={styles.bottom}>
            <p className={styles.text}>Not registered yet?</p>
            <Link
                onClick={handleClick}
                to={`/${RouteNames.register}`}
                className={styles.link}
            >
                Sign up
            </Link>
        </div>
    );
};
