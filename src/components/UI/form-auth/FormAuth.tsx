import { FC, FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useInput } from "../../../hooks/useInput";
import styles from "./FormAuth.module.scss";
import { AppBtn, AppBtnVariant } from "../app-btn/AppBtn";
import { AppInput } from "../app-input/AppInput";
import { toggleForm } from "../../../store/slices/form-slice/formActionCreators";
import { IFormVariant } from "../../../models/IForm";
import { signUpUser } from "../../../store/slices/user-slice/userActionCreators";

interface FormAuthProps {
    btnName: string;
}

export const FormAuth: FC<FormAuthProps> = props => {
    const { btnName } = props;

    const dispatch = useAppDispatch();

    const { isLoading } = useAppSelector(state => state.userReducer);
    const { isValid, variant } = useAppSelector(state => state.formReducer);

    const email = useInput("", "Enter email...", "Email is empty!");
    const password = useInput("", "Enter password...", "Password is empty!");
    const displayName = useInput("", "Enter login...", "Login is empty!");

    const handleClick = () => {
        if (!email.value.length || !password.value.length) {
            dispatch(
                toggleForm({
                    isValid: false,
                })
            );

            if (!email.value.length) {
                email.setError();
            }
            if (!password.value.length) {
                password.setError();
            }
        } else if (
            variant === IFormVariant.signUp &&
            !displayName.value.length
        ) {
            dispatch(
                toggleForm({
                    isValid: false,
                })
            );

            displayName.setError();
        } else {
            dispatch(
                toggleForm({
                    isValid: true,
                })
            );
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isValid) return;

        switch (variant) {
            case IFormVariant.signUp:
                dispatch(
                    signUpUser({ email: email.value, password: password.value })
                );

                break;
				
            case IFormVariant.signIn:
                dispatch(
                    signUpUser({
                        email: email.value,
                        password: password.value,
                        displayName: displayName.value,
                    })
                );

                break;
        }

        email.cleanValue();
        password.cleanValue();
        displayName.cleanValue();
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            {variant === IFormVariant.signUp && (
                <AppInput
                    name="login"
                    placeholderError={displayName.isError}
                    onChange={displayName.onChange}
                    onClick={displayName.deleteError}
                    placeholder={displayName.placeholder}
                    type="text"
                    value={displayName.value}
                    disabled={isLoading ? true : false}
                />
            )}

            <AppInput
                name="email"
                placeholderError={email.isError}
                onChange={email.onChange}
                onClick={email.deleteError}
                placeholder={email.placeholder}
                type="text"
                value={email.value}
                disabled={isLoading ? true : false}
            />
            <AppInput
                name="password"
                placeholderError={password.isError}
                onChange={password.onChange}
                onClick={password.deleteError}
                placeholder={password.placeholder}
                type="password"
                value={password.value}
                disabled={isLoading ? true : false}
            />
            <AppBtn
                type="submit"
                variant={
                    isLoading ? AppBtnVariant.formDisabled : AppBtnVariant.form
                }
                disabled={isLoading ? true : false}
                onClick={handleClick}
            >
                {isLoading ? "Loading..." : btnName}
            </AppBtn>
        </form>
    );
};
