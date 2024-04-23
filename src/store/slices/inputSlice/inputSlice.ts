import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInput {
    email: string;
    password: string;
    login: string;
}

interface InputState {
    input: IInput;
}

const initialState: InputState = {
    input: {} as IInput,
};

export const inputSlice = createSlice({
    name: "input",
    initialState,
    reducers: {
        setInput(state, PayloadAction<IInput>) {
			
		},
    },
});

export const inputReducer = inputSlice.reducer;
