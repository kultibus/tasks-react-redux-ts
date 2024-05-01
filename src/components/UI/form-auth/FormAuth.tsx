import { FC, FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useInput } from "../../../hooks/useInput";
import { ISignUp } from "../../../store/slices/auth-slice/authActionCreators";
import styles from "./FormAuth.module.scss";
import { AppBtn, AppBtnVariant } from "../app-btn/AppBtn";
import { AppInput } from "../app-input/AppInput";

export enum FormAuthVariant {
    signup = "signup",
    signin = "signin",
}

interface FormAuthProps {
    handleAuth: ISignUp;
    btnName: string;
    variant: FormAuthVariant;
}

export const FormAuth: FC<FormAuthProps> = props => {
    const { btnName, handleAuth, variant } = props;

    const dispatch = useAppDispatch();

    const { isLoading } = useAppSelector(state => state.authReducer);

    const email = useInput("", "Enter email...", "Email is empty!");
    const password = useInput("", "Enter password...", "Password is empty!");
    const displayName = useInput("", "Enter login...", "Login is empty!");

    const [formValid, setFormValid] = useState<boolean>(false);

    const handleClick = () => {
        if (!email.value.length || !password.value.length) {
            setFormValid(false);
            if (!email.value.length) {
                email.setError();
            }
            if (!password.value.length) {
                password.setError();
            }
        } else if (variant === "signup" && !displayName.value.length) {
            setFormValid(false);
            displayName.setError();
        } else {
            setFormValid(true);
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formValid) return;

        dispatch(handleAuth(email.value, password.value, displayName.value));

        email.cleanValue();
        password.cleanValue();
        displayName.cleanValue();
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            {variant === "signup" && (
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
