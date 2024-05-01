import { FC, ReactNode } from "react";
import { useAppDispatch } from "../../../hooks/redux";
import { userSlice } from "../../../store/slices/user-slice/userSlice";
import styles from "./FormError.module.scss";
import { AppBtn, AppBtnVariant } from "../app-btn/AppBtn";

interface FormErrorProps {
    children: ReactNode;
}

export const FormError: FC<FormErrorProps> = props => {
    const { children } = props;

    // const dispatch = useAppDispatch();

    // const { setError } = userSlice.actions;

    // const handeleClick = () => {
    //     dispatch(setError(""));
    // };

    return (
        <div className={styles.cnt}>
            <div className={styles.content}>
                <h2>An error has occurred!</h2>
                {children}
            </div>
            {/* <AppBtn
                variant={AppBtnVariant.form}
                type="button"
                onClick={handeleClick}
            >
                Try again
            </AppBtn> */}
        </div>
    );
};
