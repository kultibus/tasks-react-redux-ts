import { FC, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useInput } from "../../../hooks/useInput";
import { IFormVariant } from "../../../models/IForm";
import { setIsFormValid } from "../../../store/slices/form-slice/formSlice";
import {
    signInUser,
    signUpUser,
} from "../../../store/slices/user-slice/userActionCreators";
import { AppBtn, AppBtnVariant } from "../app-btn/AppBtn";
import { AppInput } from "../app-input/AppInput";
import styles from "./FormAuth.module.scss";

interface FormAuthProps {
    btnName: IFormVariant;
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
        dispatch(setIsFormValid(true));

        if (!email.value.length) {
            dispatch(setIsFormValid(false));

            email.setError();
        }
        if (!password.value.length) {
            dispatch(setIsFormValid(false));

            password.setError();
        }
        if (variant === IFormVariant.signUp && !displayName.value.length) {
            dispatch(setIsFormValid(false));

            displayName.setError();
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isValid) return;

        switch (variant) {
            case IFormVariant.signUp:
                dispatch(
                    signUpUser({
                        email: email.value,
                        password: password.value,
                        displayName: displayName.value,
                    })
                );

                displayName.cleanValue();

                break;

            case IFormVariant.signIn:
                dispatch(
                    signInUser({
                        email: email.value,
                        password: password.value,
                    })
                );

                break;
        }

        email.cleanValue();
        password.cleanValue();
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
