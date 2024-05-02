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
import {
    setUserError,
    setUserIsLoading,
    setUser,
    setUserAuth,
} from "./userSlice";

export const signUpUser =
    ({ displayName, email, password }: IUser) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(setUserIsLoading(true));

            await createUserWithEmailAndPassword(auth, email, password);

            onAuthStateChanged(auth, async user => {
                if (user) {
                    await updateProfile(user, { displayName: displayName });

                    dispatch(
                        setUser({
                            uid: user.uid,
                            displayName: user.displayName,
                        })
                    );

                    dispatch(setUserAuth(true));

                    localStorage.setItem("auth", "true");
                }
            });
        } catch (error) {
            dispatch(setUserError(error.message));
        }
    };

export const signInUser =
    ({ email, password }: IUser) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(setUserIsLoading(true));

            await signInWithEmailAndPassword(auth, email, password);

            onAuthStateChanged(auth, user => {
                if (user) {
                    dispatch(
                        setUser({
                            uid: user.uid,
                            displayName: user.displayName,
                        })
                    );

                    dispatch(setUserAuth(true));

                    localStorage.setItem("auth", "true");
                }
            });
        } catch (error) {
            dispatch(setUserError(error.message));
        }
    };

export const signOutUser = () => async (dispatch: AppDispatch) => {
    await signOut(auth);

    dispatch(setUser({} as IUser));

    localStorage.removeItem("auth");

    dispatch(setUserAuth(false));
};

export const checkUserAuth = () => (dispatch: AppDispatch) => {
    if (localStorage.getItem("auth")) {
        dispatch(setUserAuth(true));

        dispatch(setUserIsLoading(true));

        onAuthStateChanged(auth, user => {
            if (user) {
                dispatch(
                    setUser({
                        uid: user.uid,
                        displayName: user.displayName,
                    })
                );
            } else {
                dispatch(setUserIsLoading(false));

                dispatch(setUserAuth(false));

                localStorage.removeItem("auth");
            }
        });
    } else {
        dispatch(setUserAuth(false));
    }
};
