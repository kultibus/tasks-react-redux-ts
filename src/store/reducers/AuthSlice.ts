import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
    isAuth: boolean;
}

const initialState: AuthState = {
    isAuth: false,
    // isAuth: true,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload;
        },
    },
});

export const authReducer = authSlice.reducer;
