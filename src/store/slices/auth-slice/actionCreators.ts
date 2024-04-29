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

export const signup: ISignUp =
    (email: string, password: string, displayName: string) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(authSlice.actions.setIsLoading(true));

            await createUserWithEmailAndPassword(auth, email, password);

            onAuthStateChanged(auth, async user => {
                if (user) {
                    await updateProfile(user, { displayName: displayName });

                    dispatch(
                        authSlice.actions.setUser({
                            uid: user.uid,
                            displayName: user.displayName,
                        })
                    );

                    dispatch(authSlice.actions.setAuth(true));
                }
            });
        } catch (error) {
            dispatch(authSlice.actions.setError(error.message));
        }
    };

export const signin =
    (email: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(authSlice.actions.setIsLoading(true));

            await signInWithEmailAndPassword(auth, email, password);

            onAuthStateChanged(auth, user => {
                if (user) {
                    dispatch(
                        authSlice.actions.setUser({
                            uid: user.uid,
                            displayName: user.displayName,
                        })
                    );

                    dispatch(authSlice.actions.setAuth(true));
                }
            });
        } catch (error) {
            dispatch(authSlice.actions.setError(error.message));
        }
    };

export const signout = () => async (dispatch: AppDispatch) => {
    await signOut(auth);

    dispatch(authSlice.actions.setUser({} as IUser));

    dispatch(authSlice.actions.setAuth(false));
};

export const checkAuth = () => (dispatch: AppDispatch) => {
    try {
        dispatch(authSlice.actions.setIsLoading(true));

        onAuthStateChanged(auth, user => {
            if (user) {
                dispatch(
                    authSlice.actions.setUser({
                        uid: user.uid,
                        displayName: user.displayName,
                    })
                );
                dispatch(authSlice.actions.setAuth(true));
            } else {
                dispatch(authSlice.actions.setAuth(false));

                dispatch(authSlice.actions.setIsLoading(false));
            }
        });
    } catch (error) {
        dispatch(authSlice.actions.setError(error.message));
    }
};
