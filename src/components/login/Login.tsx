import { FC } from "react";
import { useAppSelector } from "../../hooks/redux";
import { signin } from "../../store/slices/authSlice/actionCreators";
import { FormAuth } from "../UI/forms/FormAuth";
import { LoginError } from "../UI/login-error/LoginError";
import styles from "./Login.module.scss";

export const Login: FC = () => {
    const { error } = useAppSelector(state => state.authReducer);

    return (
        <div className={styles.login}>
            {error ? (
                <LoginError />
            ) : (
                <FormAuth btnName="Sign up" handleAuth={signin} />
            )}
        </div>
    );
};
