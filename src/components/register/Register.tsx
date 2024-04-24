import { FC } from "react";
import { useAppSelector } from "../../hooks/redux";
import { signup } from "../../store/slices/authSlice/actionCreators";
import { FormAuth } from "../UI/forms/FormAuth";
import styles from "./Register.module.scss";
import { RegisterError } from "../UI/register-error/RegisterError";

export const Register: FC = () => {
    const { error } = useAppSelector(state => state.authReducer);

    return (
        <div className={styles.register}>
            {error ? (
                <RegisterError />
            ) : (
                <FormAuth isSignup btnName="Sign up" handleAuth={signup} />
            )}
        </div>
    );
};
