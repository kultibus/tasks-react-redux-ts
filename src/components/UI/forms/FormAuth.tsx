import { FC, FormEvent, useState } from "react";
import { useInput } from "../../../hooks/useInput";
import { Button } from "../buttons/Button";
import { Input } from "../inputs/Input";
import styles from "./FormAuth.module.scss";

interface FormAuthProps {
    handleAuth: (email: string, password: string, displayName: string) => void;
    btnName: string;
    isSignup?: boolean;
}

export const FormAuth: FC<FormAuthProps> = props => {
    const { btnName, isSignup, handleAuth } = props;

    const email = useInput("", "Enter email...", "Email is empty!");
    const password = useInput("", "Enter password...", "Password is empty!");
    const displayName = useInput("", "Enter login...", "Login is empty!");

    const [formValid, setFormValid] = useState<boolean>(false);

    const handleClick = () => {
        if (
            !email.value.length ||
            !password.value.length ||
            !displayName.value.length
        ) {
            setFormValid(false);
            if (!email.value.length) {
                email.setError();
            }
            if (!password.value.length) {
                password.setError();
            }
            if (!displayName.value.length) {
                displayName.setError();
            }
        } else {
            setFormValid(true);
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formValid) return;

        handleAuth(email.value, password.value, displayName.value);

        email.cleanValue();
        password.cleanValue();
        displayName.cleanValue();
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            {isSignup && (
                <Input
                    name="login"
                    placeholderError={displayName.isError}
                    onChange={displayName.onChange}
                    onClick={displayName.deleteError}
                    placeholder={displayName.placeholder}
                    type="text"
                    value={displayName.value}
                />
            )}

            <Input
                name="email"
                placeholderError={email.isError}
                onChange={email.onChange}
                onClick={email.deleteError}
                placeholder={email.placeholder}
                type="text"
                value={email.value}
            />
            <Input
                name="password"
                placeholderError={password.isError}
                onChange={password.onChange}
                onClick={password.deleteError}
                placeholder={password.placeholder}
                type="password"
                value={password.value}
            />
            <Button onClick={handleClick} type="submit">
                {btnName}
            </Button>
        </form>
    );
};
