import { FC } from "react";
import { useAppSelector } from "../hooks/redux";
import { signup } from "../store/slices/authSlice/actionCreators";
import { FormContainer } from "./form-container/FormContainer";
import { FormError } from "./UI/form-error/FormError";
import { FormAuth, FormVariant } from "./UI/forms/FormAuth";

export const Register: FC = () => {
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
                    variant={FormVariant.signup}
                    btnName="Sign up"
                    handleAuth={signup}
                />
            )}
        </FormContainer>
    );
};
