import { FC, ReactNode } from "react";
import styles from "./FormError.module.scss";
import { AppBtn, AppBtnVariant } from "../app-btn/AppBtn";
import { useAppDispatch } from "../../../hooks/redux";
import { setUserError } from "../../../store/slices/user-slice/userSlice";

interface FormErrorProps {
    children: ReactNode;
}

export const FormError: FC<FormErrorProps> = props => {
    const { children } = props;

    const dispatch = useAppDispatch();

    const handeleClick = () => {
        dispatch(setUserError(""));
    };

    return (
        <div className={styles.cnt}>
            <div className={styles.content}>
                <h2>An error has occurred!</h2>
                {children}
            </div>
            <AppBtn
                variant={AppBtnVariant.form}
                type="button"
                onClick={handeleClick}
            >
                Try again
            </AppBtn>
        </div>
    );
};
