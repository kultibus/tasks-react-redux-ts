import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User, UserInfo } from "firebase/auth";
import { IUser } from "../../../types/models/IUser";

interface UserState {
    user: IUser | null;
    userIsLoading: boolean;
    error: string;
}

const initialState: UserState = {
    user: null,
    userIsLoading: false,
    error: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserIsLoading(state, action: PayloadAction<boolean>) {
            state.userIsLoading = action.payload;
        },
        setUser(state, action: PayloadAction<IUser | null>) {
            state.userIsLoading = false;
            state.error = "";
            state.user = action.payload;
        },
        setUserError(state, action: PayloadAction<string>) {
            state.userIsLoading = false;
            state.error = action.payload;
        },
    },
});

export const userReducer = userSlice.reducer;

export const { setUserError, setUserIsLoading, setUser } = userSlice.actions;
