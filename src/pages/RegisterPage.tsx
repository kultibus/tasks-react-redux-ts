import { FC, useEffect } from "react";
import { FormAuth } from "../components/UI/form-auth/FormAuth";
import { FormError } from "../components/UI/form-error/FormError";
import { FormContainer } from "../components/form-container/FormContainer";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { IFormVariant } from "../models/IForm";
import { setFormVariant } from "../store/slices/form-slice/formSlice";

export const RegisterPage: FC = () => {
    const { error } = useAppSelector(state => state.userReducer);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setFormVariant(IFormVariant.signUp));
    }, []);

    return (
        <FormContainer>
            {error ? (
                <FormError>
                    <p>
                        The entered email is already registered or the password
                        is too weak
                    </p>
                </FormError>
            ) : (
                <FormAuth btnName={IFormVariant.signUp} />
            )}
        </FormContainer>
    );
};
