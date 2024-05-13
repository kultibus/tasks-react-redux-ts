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
import { setUser, setUserError, setUserIsLoading } from "./userSlice";

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
                }
            });
        } catch (error) {
            dispatch(setUserError(error.message));
        }
    };

export const signOutUser = () => async (dispatch: AppDispatch) => {
    await signOut(auth);

    dispatch(setUser({} as IUser));
};

export const checkUserAuth =
    (setIsAuth: React.Dispatch<React.SetStateAction<boolean>>) =>
    (dispatch: AppDispatch) => {
        dispatch(setUserIsLoading(true));

        onAuthStateChanged(auth, user => {
            if (user) {
                localStorage.setItem("auth", "true");

                setIsAuth(true);

                dispatch(
                    setUser({
                        uid: user.uid,
                        displayName: user.displayName,
                    })
                );
            } else {
                localStorage.removeItem("auth");

                setIsAuth(false);

                dispatch(setUser({} as IUser));

                dispatch(setUserIsLoading(false));
            }
        });
    };
