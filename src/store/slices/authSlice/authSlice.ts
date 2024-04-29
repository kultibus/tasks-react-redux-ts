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
    name: "auth",
    initialState,
    reducers: {
        setIsLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setUser(state, action: PayloadAction<IUser>) {
            state.isLoading = false;
            state.error = "";
            state.user = action.payload;
        },
        setError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        setAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload;
            state.isLoading = false;
        },
    },
});

export const authReducer = authSlice.reducer;
