import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { IUser } from "../../../models/IUser";
import { AppDispatch } from "../../store";
import { authSlice } from "./authSlice";

export const signup =
    (email: string, password: string, appUser: IUser, login: string) =>
    async (dispatch: AppDispatch) => {
        const auth = getAuth();

        try {
            dispatch(authSlice.actions.userAuth());

            await createUserWithEmailAndPassword(auth, email, password);

            await updateProfile(auth.currentUser, { displayName: login });

            const user = auth.currentUser;

            if (user !== null) {
                dispatch(
                    authSlice.actions.authSuccess({
                        ...appUser,
                        email: user.email,
                        login: user.displayName,
                    })
                );
            }
        } catch (error) {
            dispatch(authSlice.actions.authError(error.message));
        }
    };

export const signin =
    (email: string, password: string, appUser: IUser) =>
    async (dispatch: AppDispatch) => {
        const auth = getAuth();

        try {
            dispatch(authSlice.actions.userAuth());

            await signInWithEmailAndPassword(auth, email, password);

            const user = auth.currentUser;

            if (user !== null) {
                dispatch(
                    authSlice.actions.authSuccess({
                        ...appUser,
                        email: user.email,
                        login: user.displayName,
                    })
                );
            }
        } catch (error) {
            dispatch(authSlice.actions.authError(error.message));
        }
    };
