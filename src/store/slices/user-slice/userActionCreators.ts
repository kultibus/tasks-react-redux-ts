import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth";
import { localStorageApi } from "../../../api/api";
import { auth } from "../../../firebase";
import { IUser } from "../../../types/models/IUser";
import { AppDispatch } from "../../store";
import { setUser, setUserError, setUserIsLoading } from "./userSlice";
import { IDataVariant } from "../../../types/types";
import { setProjects } from "../projects-slice/projectsSlice";
import { setTasks } from "../tasks-slice/tasksSlice";

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
    async (dispatch: AppDispatch) => {
        dispatch(setUserIsLoading(true));

        signInWithEmailAndPassword(auth, email, password).catch(e =>
            dispatch(setUserError(e.message))
        );
    };

export const signOutUser = () => async (dispatch: AppDispatch) => {
    signOut(auth);

    // dispatch(setUser(null));

    dispatch(setProjects([]));

    dispatch(setTasks([]));

    localStorageApi.clearLocalData();
};

// export const checkUserAuth = () => (dispatch: AppDispatch) => {
//     dispatch(setUserIsLoading(true));

//     const localUser = localStorageApi.getLocalData<IUser>(IDataVariant.user);

//     if (!!localUser) {
//         dispatch(setUser(localUser));
//         return;
//     }

//     dispatch(setUserIsLoading(false));
// };
