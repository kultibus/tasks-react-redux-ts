import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth";
import { auth } from "../../../firebase";
import { IUser } from "../../../models/IUser";
import { AppDispatch } from "../../store";
import { authSlice } from "./authSlice";

export const signup =
    (email: string, password: string, appUser: IUser, login: string) =>
    async (dispatch: AppDispatch) => {
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
                dispatch(authSlice.actions.setAuth(true));
                localStorage.setItem("auth", "true");
            }
        } catch (error) {
            dispatch(authSlice.actions.setError(error.message));
        }
    };

export const signin =
    (email: string, password: string, appUser: IUser) =>
    async (dispatch: AppDispatch) => {
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

                dispatch(authSlice.actions.setAuth(true));
                localStorage.setItem("auth", "true");
            }
        } catch (error) {
            dispatch(authSlice.actions.setError(error.message));
        }
    };

export const signout = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(authSlice.actions.setIsLoading());

        await signOut(auth);

        dispatch(authSlice.actions.setUser({} as IUser));

        dispatch(authSlice.actions.setAuth(false));

        localStorage.removeItem("auth");
    } catch (error) {
        dispatch(authSlice.actions.setError(error.message));
    }
};
