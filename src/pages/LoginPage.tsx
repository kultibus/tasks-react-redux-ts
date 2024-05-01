import { FC } from "react";
import { useAppSelector } from "../hooks/redux";
import { signInUser } from "../store/slices/user-slice/userActionCreators";
import { FormContainer } from "../components/form-container/FormContainer";
import { FormError } from "../components/UI/form-error/FormError";
import { FormAuth } from "../components/UI/form-auth/FormAuth";
import { LoginBottom } from "../components/login-bottom/LoginBottom";
import { IFormVariant } from "../models/IForm";

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
