import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
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
            dispatch(authSlice.actions.setIsLoading());

            await createUserWithEmailAndPassword(auth, email, password);

            await updateProfile(auth.currentUser, { displayName: login });

            const user = auth.currentUser;

            if (user !== null) {
                dispatch(
                    authSlice.actions.setUser({
                        ...appUser,
                        email: user.email,
                        login: user.displayName,
                    })
                );
            }
        } catch (error) {
            dispatch(authSlice.actions.setError(error.message));
        }
    };

export const signin =
    (email: string, password: string, appUser: IUser) =>
    async (dispatch: AppDispatch) => {
        const auth = getAuth();

        try {
            dispatch(authSlice.actions.setIsLoading());

            await signInWithEmailAndPassword(auth, email, password);

            const user = auth.currentUser;

            if (user !== null) {
                dispatch(
                    authSlice.actions.setUser({
                        ...appUser,
                        email: user.email,
                        login: user.displayName,
                    })
                );
            }
        } catch (error) {
            dispatch(authSlice.actions.setError(error.message));
        }
    };

export const signout = () => async (dispatch: AppDispatch) => {
    const auth = getAuth();

    try {
        dispatch(authSlice.actions.setIsLoading());

        await signOut(auth);

        // onAuthStateChanged(auth, user => {
        //     if (user) {
        //         console.log("user in");
        //     } else {
        //         console.log("user out");
        //     }
        // });

        dispatch(authSlice.actions.setUser({} as IUser));
    } catch (error) {
        dispatch(authSlice.actions.setError(error.message));
    }
};
