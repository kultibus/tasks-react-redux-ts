import { FC } from "react";
import styles from "./Login.module.scss";

export const Login: FC = () => {
    return (
        <div className={styles.cnt}>
            <div className={styles.login}>Login</div>
        </div>
    );
};
