import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../../models/IUser";

interface UserState {
    user: IUser;
    isLoading: boolean;
    error: string;
}

const initialState: UserState = {
    user: {} as IUser,
    isLoading: false,
    error: "",
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
    },
});

export const userReducer = userSlice.reducer;

export const { setUserError, setUserIsLoading, setUser } =
    userSlice.actions;
