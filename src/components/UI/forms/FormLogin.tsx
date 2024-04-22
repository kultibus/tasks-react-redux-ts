import { FC, FormEvent, useState } from "react";
import { ButtonSubmit } from "../buttons/ButtonSubmit";
import { Input } from "../inputs/Input";
import styles from "./FormLogin.module.scss";

interface FormLoginProps {
    handleClick: () => void;
}

export const FormLogin: FC<FormLoginProps> = props => {
    const { handleClick } = props;

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };



    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <Input
                value={email}
                type="text"
                placeholder="Enter email..."
                onChange={e => setEmail(e.target.value)}
            />
            <Input
                value={password}
                type="password"
                placeholder="Enter password..."
                onChange={e => setPassword(e.target.value)}
            />
            <ButtonSubmit onClick={handleClick} type="submit">
                Sigh in
            </ButtonSubmit>
        </form>
    );
};
