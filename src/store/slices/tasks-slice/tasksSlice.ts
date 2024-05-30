import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITask } from "../../../types/models/ITask";

interface TasksState {
    tasks: ITask[];
    formTask: ITask | null;
    draggbleTask: ITask | null;
    tasksIsLoading: boolean;
    error: string;
}

const initialState: TasksState = {
    tasks: [],
    formTask: null,
    draggbleTask: null,
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

        setFormTask(state, action: PayloadAction<ITask | null>) {
            state.formTask = action.payload;
        },
        setDraggbleTask(state, action: PayloadAction<ITask | null>) {
            state.draggbleTask = action.payload;
        },
    },
});

export const tasksReducer = tasksSlice.reducer;

export const { setTasksIsLoading, setFormTask, setDraggbleTask, setTasks } =
    tasksSlice.actions;
