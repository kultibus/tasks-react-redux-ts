import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../../models/IUser";

interface UserState {
    user: IUser;
    isLoading: boolean;
    error: string;
    isUserAuth: boolean;
}

const initialState: UserState = {
    user: {} as IUser,
    isLoading: false,
    error: "",
    isUserAuth: !!localStorage.getItem("auth"),
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserIsLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setUser(state, action: PayloadAction<IUser>) {
            state.isLoading = false;
            state.error = "";
            state.user = action.payload;
        },
        setUserError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        setUserAuth(state, action: PayloadAction<boolean>) {
            state.isUserAuth = action.payload;
        },
    },
});

export const userReducer = userSlice.reducer;

export const { setUserError, setUserIsLoading, setUser, setUserAuth } =
    userSlice.actions;
