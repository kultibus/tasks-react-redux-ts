import { FC } from "react";
import { useAppSelector } from "../hooks/redux";
import { signup } from "../store/slices/auth-slice/actionCreators";
import { FormContainer } from "../components/form-container/FormContainer";
import { FormError } from "../components/UI/form-error/FormError";
import {
    FormAuth,
    FormAuthVariant,
} from "../components/UI/forms/form-auth/FormAuth";

export const RegisterPage: FC = () => {
    const { error } = useAppSelector(state => state.authReducer);

    return (
        <FormContainer>
            {error ? (
                <FormError>
                    <p>
                        Maybe the entered email is already registered or is
                        incorrect or the password is too weak
                    </p>
                </FormError>
            ) : (
                <FormAuth
                    variant={FormAuthVariant.signup}
                    btnName="Sign up"
                    handleAuth={signup}
                />
            )}
        </FormContainer>
    );
};
