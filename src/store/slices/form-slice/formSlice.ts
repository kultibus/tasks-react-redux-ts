import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IForm, IFormVariant } from "../../../models/IForm";

const initialState: IForm = {
    isOpened: false,
    isValid: false,
    variant: null,
};

export const formSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
        setIsFormOpened(state, action: PayloadAction<boolean>) {
            state.isOpened = action.payload;
        },
        setIsFormValid(state, action: PayloadAction<boolean>) {
            state.isValid = action.payload;
        },
        setFormVariant(state, action: PayloadAction<IFormVariant>) {
            state.variant = action.payload;
        },
    },
});

export const formReducer = formSlice.reducer;

export const { setFormVariant, setIsFormOpened, setIsFormValid } =
    formSlice.actions;
