import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ProjectsFormState {
    isOpened: boolean;
}

const initialState: ProjectsFormState = {
    isOpened: true,
};

export const projectFormSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsOpened(state, action: PayloadAction<boolean>) {
            state.isOpened = action.payload;
        },
    },
});

export const projectFormReducer = projectFormSlice.reducer;
