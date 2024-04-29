import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth";
import { auth } from "../../../firebase";
import { IUser } from "../../../models/IUser";
import { AppDispatch } from "../../store";
import { authSlice } from "./authSlice";

export type ISignUp = (
    email: string,
    password: string,
    displayName?: string
) => (dispatch: AppDispatch) => Promise<void>;

const handleAuthStateChanged = (
    dispatch: AppDispatch,
    isUpdate?: boolean,
    displayName?: string
) =>
    onAuthStateChanged(auth, async user => {
        if (user) {
            if (isUpdate) {
                await updateProfile(user, {
                    displayName: displayName,
                });
            }

            dispatch(
                authSlice.actions.setUser({
                    uid: user.uid,
                    displayName: user.displayName,
                })
            );

            dispatch(authSlice.actions.setAuth(true));

            // localStorage.setItem("auth", "true");

            // localStorage.setItem("name", user.displayName);

            // localStorage.setItem("id", user.uid);
        } 
    });

export const signup: ISignUp =
    (email: string, password: string, displayName: string) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(authSlice.actions.setIsLoading());

            await createUserWithEmailAndPassword(auth, email, password);

            handleAuthStateChanged(dispatch, true, displayName);
        } catch (error) {
            dispatch(authSlice.actions.setError(error.message));
        }
    };

export const signin =
    (email: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(authSlice.actions.setIsLoading());

            await signInWithEmailAndPassword(auth, email, password);

            handleAuthStateChanged(dispatch);
        } catch (error) {
            dispatch(authSlice.actions.setError(error.message));
        }
    };

export const signout = () => async (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.setIsLoading());

    await signOut(auth);

    dispatch(authSlice.actions.setUser({} as IUser));

    dispatch(authSlice.actions.setAuth(false));

    // localStorage.removeItem("auth");
    // localStorage.removeItem("name");
    // localStorage.removeItem("id");
};

export const checkAuth = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(authSlice.actions.setIsLoading());

        handleAuthStateChanged(dispatch);
    } catch (error) {
        dispatch(authSlice.actions.setError(error.message));
    }
};
