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
import { userSlice } from "./userSlice";


const { setError, setIsLoading, setUser } = userSlice.actions;

export const signUpUser =
    ({ displayName, email, password }: IUser) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(setIsLoading(true));

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
            dispatch(setError(error.message));
        }
    };

export const signInUser =
    ({ email, password }: IUser) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(setIsLoading(true));

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
            dispatch(setError(error.message));
        }
    };

export const signOutUser = () => async (dispatch: AppDispatch) => {
    await signOut(auth);

    dispatch(setUser({} as IUser));
};

// export const checkAuth = () => (dispatch: AppDispatch) => {
//     onAuthStateChanged(auth, user => {
//         if (user) {
//             dispatch(
//                 authSlice.actions.setUser({
//                     uid: user.uid,
//                     displayName: user.displayName,
//                 })
//             );
//             dispatch(authSlice.actions.setAuth(true));
//         } else {
//             dispatch(authSlice.actions.setUser({} as IUser));

//             dispatch(authSlice.actions.setAuth(false));
//         }
//     });
// };
