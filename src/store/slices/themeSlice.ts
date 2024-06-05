import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User, UserInfo } from "firebase/auth";
import { IUser } from "../../types/models/IUser";
import { IThemeVariant } from "../../types/types";

interface ThemeState {
    theme: IThemeVariant;
}

const initialState: ThemeState = {
    theme: IThemeVariant.light,
};

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme(state, action: PayloadAction<IThemeVariant>) {
            state.theme = action.payload;
        },
    },
});

export const themeReducer = themeSlice.reducer;

export const { setTheme } = themeSlice.actions;
