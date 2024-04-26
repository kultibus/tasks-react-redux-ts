import { FC } from "react";
import { useAppSelector } from "../hooks/redux";
import { signin } from "../store/slices/authSlice/actionCreators";
import { FormBottom } from "./UI/form-bottom/FormBottom";
import { FormError } from "./UI/form-error/FormError";
import { FormAuth, FormVariant } from "./UI/forms/FormAuth";
import { FormContainer } from "./form-container/FormContainer";
import { MainCnt } from "./main-cnt/MainCnt";

export const Login: FC = () => {
    const { error } = useAppSelector(state => state.authReducer);

    return (
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
    );
};
