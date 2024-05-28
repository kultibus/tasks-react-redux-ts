import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITask } from "../../../types/models/ITask";

interface TasksState {
    tasks: ITask[];
    tasksIsLoading: boolean;
    error: string;
}

const initialState: TasksState = {
    tasks: [],
    tasksIsLoading: false,
    error: "",
};

export const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        setTasksIsLoading(state, action: PayloadAction<boolean>) {
            state.tasksIsLoading = action.payload;
        },

        setTasks(state, action: PayloadAction<ITask[]>) {
            state.tasks = action.payload;
            state.tasksIsLoading;
        },
    },
});

export const tasksReducer = tasksSlice.reducer;

export const { setTasksIsLoading, setTasks } = tasksSlice.actions;
