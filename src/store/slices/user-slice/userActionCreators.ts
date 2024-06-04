import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth";
import { auth } from "../../../firebase";
import { setProjects } from "../projectsSlice";
import { AppDispatch } from "../../store";
import { setTasks } from "../tasksSlice";
import { setUserError, setUserIsLoading } from "./userSlice";

export interface ISignInCreds {
    email: string;
    password: string;
}

export interface ISignUpCreds extends ISignInCreds {
    displayName: string;
}

export const signUpUser =
    ({ displayName, email, password }: ISignUpCreds) =>
    (dispatch: AppDispatch) => {
        dispatch(setUserIsLoading(true));

        createUserWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                updateProfile(user, { displayName });
            })
            .catch(e => {
                dispatch(setUserError(e.message));
            });
    };

export const signInUser =
    ({ email, password }: ISignInCreds) =>
    (dispatch: AppDispatch) => {
        dispatch(setUserIsLoading(true));

        signInWithEmailAndPassword(auth, email, password).catch(e =>
            dispatch(setUserError(e.message))
        );
    };

export const signOutUser = () => (dispatch: AppDispatch) => {
    signOut(auth);

    dispatch(setProjects([]));

    dispatch(setTasks([]));
};
