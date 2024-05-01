import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IForm, IFormVariant } from "../../../models/IForm";

const initialState: IForm = {
    isOpened: false,
    isValid: false,
    variant: IFormVariant.initial,
};

export const formProjectSlice = createSlice({
    name: "formProjects",
    initialState,
    reducers: {
        setIsOpened(state, action: PayloadAction<boolean>) {
            state.isOpened = action.payload;
        },
        setVariant(state, action: PayloadAction<IFormVariant>) {
            state.variant = action.payload;
        },
        setIsValid(state, action: PayloadAction<boolean>) {
            state.isValid = action.payload;
        },
    },
});

export const formProjectsReducer = formProjectSlice.reducer;
