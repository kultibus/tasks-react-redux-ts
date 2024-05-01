import { FC } from "react";
import { FormAuth } from "../components/UI/form-auth/FormAuth";
import { FormError } from "../components/UI/form-error/FormError";
import { FormContainer } from "../components/form-container/FormContainer";
import { useAppSelector } from "../hooks/redux";
import { IFormVariant } from "../models/IForm";

export const RegisterPage: FC = () => {
    const { error } = useAppSelector(state => state.userReducer);

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
                <FormAuth btnName={IFormVariant.signUp} />
            )}
        </FormContainer>
    );
};
