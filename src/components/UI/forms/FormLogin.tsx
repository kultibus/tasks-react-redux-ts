import { FC, useState } from "react";
import { Button } from "../buttons/Button";
import { Input } from "../inputs/Input";
import styles from "./FormLogin.module.scss";

interface FormLoginProps {
    handleClick: (email: string, password: string) => void;
    title: string;
}

export const FormLogin: FC<FormLoginProps> = props => {
    const { handleClick, title } = props;

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return (
        <form onSubmit={e => e.preventDefault()} className={styles.form}>
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
            <Button onClick={() => handleClick(email, password)} type="submit">
                {title}
            </Button>
        </form>
    );
};
