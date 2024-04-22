import { FC } from "react";
import styles from "./Login.module.scss";
import { FormLogin } from "../UI/forms/FormLogin";

export const Login: FC = () => {
    return (
        <div className={styles.login}>
            <FormLogin />
        </div>
    );
};
