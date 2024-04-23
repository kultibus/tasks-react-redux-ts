import {
    createUserWithEmailAndPassword,
    getAuth,
    updateProfile,
} from "firebase/auth";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { FormAuth } from "../UI/forms/FormAuth";
import styles from "./Register.module.scss";
import { authSlice } from "../../store/slices/authSlice/authSlice";
import { Button } from "../UI/buttons/Button";
import { signup } from "../../store/slices/authSlice/actionCreators";

export const Register: FC = () => {
    const dispatch = useAppDispatch();
    // const { user: appUser } = useAppSelector(state => state.authReducer);

    // const handleRegister = async (
    //     email: string,
    //     password: string,
    //     login: string
    // ) => {
    //     const auth = getAuth();

    //     try {
    //         await createUserWithEmailAndPassword(auth, email, password);

    //         await updateProfile(auth.currentUser, { displayName: login });

    //         const user = auth.currentUser;

    //         if (user !== null) {
    //             dispatch(
    //                 authSlice.actions.authSuccess({
    //                     ...appUser,
    //                     email: user.email,
    //                     login: user.displayName,
    //                 })
    //             );
    //         }
    //     } catch (error) {
    //         console.log(error.code, error.message);
    //     }
    // };

    return (
        <div className={styles.register}>
            {/* <FormAuth isSignup btnName="Sign up" handleAuth={handleRegister} /> */}
            <FormAuth
                isSignup
                btnName="Sign up"
                handleAuth={() => dispatch(signup)}
            />
        </div>
    );
};
