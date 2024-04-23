import {
    createUserWithEmailAndPassword,
    getAuth,
    updateProfile,
} from "firebase/auth";
import { useAppSelector } from "../../../hooks/redux";
import { AppDispatch } from "../../store";
import { authSlice } from "./authSlice";
import { IUser } from "../../../models/IUser";

// export const fetchUsers = () => async (dispatch: AppDispatch) => {
//     try {
//         dispatch(userSlice.actions.usersFetching());

//         const response = await axios.get<IUser[]>(
//             "https://jsonplaceholder.typicode.com/users"
//         );

//         dispatch(userSlice.actions.usersFetchingSuccess(response.data));
//     } catch (error) {
//         dispatch(userSlice.actions.usersFetchingError(error.message));
//     }
// };

export const signup =
    (email: string, password: string, login: string, appUser: IUser) =>
    async (dispatch: AppDispatch) => {
        // const { user: appUser } = useAppSelector(state => state.authReducer);

        const auth = getAuth();

        try {
            dispatch(authSlice.actions.userAuth());

            await createUserWithEmailAndPassword(auth, email, password);

            await updateProfile(auth.currentUser, { displayName: login });

            const user = auth.currentUser;

            if (user !== null) {
                dispatch(
                    authSlice.actions.authSuccess({
                        ...appUser,
                        email: user.email,
                        login: user.displayName,
                    })
                );
            }
        } catch (error) {
            dispatch(authSlice.actions.authError(error.message));
        }
    };
