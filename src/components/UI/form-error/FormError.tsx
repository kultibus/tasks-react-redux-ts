import { FC, ReactNode } from "react";
import { useAppDispatch } from "../../../hooks/redux";
import { authSlice } from "../../../store/slices/authSlice/authSlice";
import { BtnVariant, Button } from "../buttons/Button";
import styles from "./FormError.module.scss";

interface FormErrorProps {
    children: ReactNode;
}

export const FormError: FC<FormErrorProps> = props => {
    const { children } = props;

    const dispatch = useAppDispatch();

    const { setError } = authSlice.actions;

    const handeleClick = () => {
        dispatch(setError(""));
    };

    return (
        <div className={styles.cnt}>
            <div className={styles.content}>
                <h2>An error has occurred!</h2>
                {children}
            </div>
            <Button variant={BtnVariant.btn} type="button" onClick={handeleClick}>
                Try again
            </Button>
        </div>
    );
};
