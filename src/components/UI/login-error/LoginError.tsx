import { FC } from "react";
import { useAppDispatch } from "../../../hooks/redux";
import { authSlice } from "../../../store/slices/authSlice/authSlice";
import { Button } from "../buttons/Button";
import styles from "./LoginError.module.scss";

export const LoginError: FC = () => {
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
