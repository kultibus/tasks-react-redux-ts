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
            dispatch(authSlice.actions.setIsLoading());

            await createUserWithEmailAndPassword(auth, email, password);

            onAuthStateChanged(auth, async user => {
                if (user) {
                    await updateProfile(user, {
                        displayName: displayName,
                    });

                    dispatch(
                        authSlice.actions.setUser({
                            uid: user.email,
                            displayName: user.displayName,
                        })
                    );

                    dispatch(authSlice.actions.setAuth(true));

                    localStorage.setItem("auth", "true");

                    localStorage.setItem("name", user.displayName);

                    localStorage.setItem("id", user.uid);

					console.log(user)
                }
            });
        } catch (error) {
            dispatch(authSlice.actions.setError(error.message));
        }
    };

export const signin =
    (email: string, password: string) => async (dispatch: AppDispatch) => {
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
                localStorage.setItem("displayname", user.displayName);
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
        localStorage.removeItem("displayname");
    } catch (error) {
        dispatch(authSlice.actions.setError(error.message));
    }
};
