import { FC, useEffect } from "react";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { FormAuth } from "../components/UI/form-auth/FormAuth";
import { FormError } from "../components/UI/form-error/FormError";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { IFormVariant } from "../models/IForm";
import { RouteNames } from "../router";
import { setFormVariant } from "../store/slices/form-slice/formSlice";

export const LoginPage: FC = () => {
    const { error } = useAppSelector(state => state.userReducer);
    const { variant } = useAppSelector(state => state.formReducer);

    const dispatch = useAppDispatch();

    const path = useLoaderData();

    useEffect(() => {
        if (path === RouteNames.login) {
            dispatch(setFormVariant(IFormVariant.signIn));
        }
        if (path === RouteNames.register) {
            dispatch(setFormVariant(IFormVariant.signUp));
        }
    }, [path]);

    return error ? (
        <FormError>
            {variant === IFormVariant.signIn ? (
                <p>Email or password is incorrect.</p>
            ) : (
                <p>
                    Email is already registered or is incorrect
                    <br />
                    Or the password is too weak
                </p>
            )}
        </FormError>
    ) : (
        <FormAuth
            btnName={
                variant === IFormVariant.signIn
                    ? IFormVariant.signIn
                    : IFormVariant.signUp
            }
        />
    );
};

export const loginPageLoader = ({ request }: LoaderFunctionArgs<any>) => {
    const url = request.url;

    return url.slice(url.lastIndexOf("/") + 1);
};
