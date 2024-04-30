import { FC } from "react";
import { useAppSelector } from "../hooks/redux";
import { signin } from "../store/slices/auth-slice/actionCreators";
import { FormContainer } from "../components/form-container/FormContainer";
import { FormError } from "../components/UI/form-error/FormError";
import { FormAuth, FormAuthVariant } from "../components/UI/form-auth/FormAuth";
import { LoginBottom } from "../components/login-bottom/LoginBottom";

export const LoginPage: FC = () => {
    const { error } = useAppSelector(state => state.authReducer);

    return (
        <FormContainer>
            {error ? (
                <FormError>
                    <p>The entered email or password is incorrect.</p>
                </FormError>
            ) : (
                <FormAuth
                    variant={FormAuthVariant.signin}
                    btnName="Sign in"
                    handleAuth={signin}
                />
            )}
            <LoginBottom />
        </FormContainer>
    );
};
