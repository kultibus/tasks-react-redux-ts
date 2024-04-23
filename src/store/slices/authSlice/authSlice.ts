import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../../models/IUser";

interface AuthState {
    user: IUser;
    isLoading: boolean;
    error: string;
    isAuth: boolean;
}

const initialState: AuthState = {
    user: {} as IUser,
    isLoading: false,
    error: "",
    isAuth: false,
};

export const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userAuth(state) {
            state.isLoading = true;
        },
        authSuccess(state, action: PayloadAction<IUser>) {
            state.isLoading = false;
            state.error = "";
            state.user = action.payload;
            // state.isAuth = true;
        },
        authError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        userSignout(state) {
            state.user = {} as IUser;
        },
    },
});

export const authReducer = authSlice.reducer;
