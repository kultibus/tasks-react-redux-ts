import { FC } from "react";
import { useAppSelector } from "../../hooks/redux";
import { signin } from "../../store/slices/authSlice/actionCreators";
import { FormBottom } from "../UI/form-bottom/FormBottom";
import { FormAuth, FormVariant } from "../UI/forms/FormAuth";
import styles from "./Login.module.scss";
import { FormError } from "../UI/form-error/FormError";
import { FormContainer } from "../form-container/FormContainer";

export const Login: FC = () => {
    const { error } = useAppSelector(state => state.authReducer);

    return (
        <div className={styles.login}>
            <FormContainer>
                {error ? (
                    <FormError>
                        <p>The entered email or password is incorrect.</p>
                    </FormError>
                ) : (
                    <FormAuth
                        variant={FormVariant.signin}
                        btnName="Sign in"
                        handleAuth={signin}
                    />
                )}
                <FormBottom />
            </FormContainer>
        </div>
    );
};
