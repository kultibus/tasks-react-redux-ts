import { createSlice } from "@reduxjs/toolkit";
import { IBoard } from "../../../models/IBoard";
import { ITaskState } from "../../../models/ITask";

interface BoardsState {
    boards: IBoard[];
}

const initialState: BoardsState = {
    boards: [
        { name: ITaskState.opened, current: false },
        { name: ITaskState.inProcess, current: false },
        { name: ITaskState.done, current: false },
    ],
};

export const boardsSlice = createSlice({
    name: "boards",
    initialState,
    reducers: {},
});

export const boardsReducer = boardsSlice.reducer;
