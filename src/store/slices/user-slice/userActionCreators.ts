import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth";
import { localStorageApi } from "../../../api/api";
import { auth } from "../../../firebase";
import { IUser } from "../../../models/IUser";
import { AppDispatch } from "../../store";
import { setUser, setUserError, setUserIsLoading } from "./userSlice";

export interface ISignInCreds {
    email: string;
    password: string;
}

export interface ISignUpCreds extends ISignInCreds {
    displayName: string;
}

export const signUpUser =
    ({ displayName, email, password }: ISignUpCreds) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(setUserIsLoading(true));

            const { user } = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            await updateProfile(user, { displayName });

            const localUser: IUser = {
                uid: user.uid,
                displayName: user.displayName,
            };

            dispatch(setUser(localUser));

            localStorageApi.setUser(localUser);
        } catch (error) {
            dispatch(setUserError(error.message));
        }
    };

export const signInUser =
    ({ email, password }: ISignInCreds) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(setUserIsLoading(true));

            const { user } = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            const localUser: IUser = {
                uid: user.uid,
                displayName: user.displayName,
            };

            dispatch(setUser(localUser));

            localStorageApi.setUser(localUser);
        } catch (error) {
            dispatch(setUserError(error.message));
        }
    };

export const signOutUser = () => async (dispatch: AppDispatch) => {
    signOut(auth);

    dispatch(setUser(null));

    localStorageApi.clear();
};

export const checkUserAuth = () => (dispatch: AppDispatch) => {
    dispatch(setUserIsLoading(true));
	
    const localUser = localStorageApi.getUser();
	
    if (!!localUser) {
		dispatch(setUser(localUser));
        return;
    }

    dispatch(setUserIsLoading(false));
};
