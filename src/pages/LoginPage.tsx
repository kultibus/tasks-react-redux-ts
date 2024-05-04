import { FC, useEffect } from "react";
import { FormAuth } from "../components/UI/form-auth/FormAuth";
import { FormError } from "../components/UI/form-error/FormError";
import { FormContainer } from "../components/form-container/FormContainer";
import { LoginBottom } from "../components/login-bottom/LoginBottom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { IFormVariant } from "../models/IForm";
import { setFormVariant } from "../store/slices/form-slice/formSlice";

export const LoginPage: FC = () => {
    const { error } = useAppSelector(state => state.userReducer);

    return (
        <FormContainer>
            {error ? (
                <FormError>
                    <p>The entered email or password is incorrect.</p>
                </FormError>
            ) : (
                <FormAuth btnName={IFormVariant.signIn} />
            )}
            <LoginBottom />
        </FormContainer>
    );
};
