import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITask } from "../../../types/models/ITask";
import { IProjectTasks, ITasks } from "../../../types/types";

interface TasksState extends ITasks {
    currentTask: ITask;
    tasksIsLoading: boolean;
    error: string;
}

const initialState: TasksState = {
    opened: [],
    inProcess: [],
    done: [],
    currentTask: {} as ITask,
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

        setOpened(state, action: PayloadAction<IProjectTasks[]>) {
            state.opened = action.payload;
            state.tasksIsLoading = false;
        },
        setInProcess(state, action: PayloadAction<IProjectTasks[]>) {
            state.inProcess = action.payload;
            state.tasksIsLoading = false;
        },
        setDone(state, action: PayloadAction<IProjectTasks[]>) {
            state.done = action.payload;
            state.tasksIsLoading = false;
        },

        setCurrentTask(state, action: PayloadAction<ITask>) {
            state.currentTask = action.payload;
        },
    },
});

export const tasksReducer = tasksSlice.reducer;

export const {
    setOpened,
    setInProcess,
    setDone,
    setTasksIsLoading,
    setCurrentTask,
} = tasksSlice.actions;
