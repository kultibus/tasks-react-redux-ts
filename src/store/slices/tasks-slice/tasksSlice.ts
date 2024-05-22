import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITask, ITaskState } from "../../../types/models/ITask";

interface TasksState {
    boards: ITaskState[];
    currentBoardIndex: number;
    tasks: ITask[];
    currentTask: ITask;
    tasksIsLoading: boolean;
    error: string;
    taskIsDragging: boolean;
}

const initialState: TasksState = {
    boards: [ITaskState.opened, ITaskState.inProcess, ITaskState.done],
    currentBoardIndex: null,
    tasks: [],
    currentTask: {} as ITask,
    tasksIsLoading: false,
    error: "",
    taskIsDragging: false,
};

export const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        setTasksIsLoading(state, action: PayloadAction<boolean>) {
            state.tasksIsLoading = action.payload;
        },

        setTaskIsDragging(state, action: PayloadAction<boolean>) {
            state.taskIsDragging = action.payload;
        },

        setTasks(state, action: PayloadAction<ITask[]>) {
            state.tasks = action.payload;
            state.tasksIsLoading = false;
        },

        setCurrentTask(state, action: PayloadAction<ITask>) {
            state.currentTask = action.payload;
        },
    },
});

export const tasksReducer = tasksSlice.reducer;

export const {
    setTasks,
    setTasksIsLoading,
    setCurrentTask,
    setTaskIsDragging,
} = tasksSlice.actions;
