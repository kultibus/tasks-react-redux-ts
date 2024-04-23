import { FC } from "react";
import styles from "./Login.module.scss";
import { FormAuth } from "../UI/forms/FormAuth";
import { useAppDispatch } from "../../hooks/redux";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { RouteNames } from "../../router";

export const Login: FC = () => {
    const dispatch = useAppDispatch();

    const handleLogin = (email: string, password: string) => {
        // const auth = getAuth();
        // signInWithEmailAndPassword(auth, email, password)
        //     .then(console.log)
        //     .catch(error => console.log(error));
    };

    return (
        <div className={styles.login}>
            {/* <FormLogin title="Sign in" handleClick={handleLogin} /> */}
            <FormAuth btnName="Sign in" handleAuth={handleLogin} />
        </div>
    );
};
