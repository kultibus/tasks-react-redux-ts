import { FC } from "react";
import { useRouteError } from "react-router-dom";
import { Button } from "../buttons/Button";
import styles from "./RegisterError.module.scss";
import { authSlice } from "../../../store/slices/authSlice/authSlice";
import { useAppDispatch } from "../../../hooks/redux";

export const RegisterError: FC = () => {
    const dispatch = useAppDispatch();

    const { deleteError } = authSlice.actions;

    const handeleClick = () => {
        dispatch(deleteError());
    };

    return (
        <div className={styles.cnt}>
            <div className={styles.content}>
                <h2 className={styles.title}>An error has occurred!</h2>
                <p className={styles.text}>
                    Maybe the entered email is already registered or is
                    incorrect or the password is too weak
                </p>
            </div>
            <Button onClick={handeleClick} disabled={false}>
                Try again
            </Button>
        </div>
    );
};
