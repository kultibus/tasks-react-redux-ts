import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITask } from "../../types/models/ITask";

interface TasksState {
    tasks: ITask[] | null;
    activeTask: ITask | null;
    tasksIsLoading: boolean;
    error: string;
}

const initialState: TasksState = {
    tasks: null,
    activeTask: null,
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

        setTasks(state, action: PayloadAction<ITask[] | null>) {
            state.tasks = action.payload;
            state.tasksIsLoading;
        },

        setActiveTask(state, action: PayloadAction<ITask | null>) {
            state.activeTask = action.payload;
        },
    },
});

export const tasksReducer = tasksSlice.reducer;

export const { setTasksIsLoading, setActiveTask, setTasks } =
    tasksSlice.actions;
