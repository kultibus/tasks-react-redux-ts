import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged } from "firebase/auth";
import { FC } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { FormLogin } from "../UI/forms/FormLogin";
import styles from "./Register.module.scss";
// import { auth } from "../../firebase";

export const Register: FC = () => {
    const dispatch = useAppDispatch();

    const handleRegister = (email: string, password: string) => {
        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
            .then()
            .catch(error => console.log(error));

       
    };

    return (
        <div className={styles.register}>
            <FormLogin title="Sign up" handleClick={handleRegister} />
        </div>
    );
};
