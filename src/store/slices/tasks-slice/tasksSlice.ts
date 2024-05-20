import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITask, ITaskState } from "../../../types/models/ITask";

interface TasksState {
    boards: ITaskState[];
    currentBoardIndex: number;
    tasks: ITask[];
    currentTask: ITask;
    tasksIsLoading: boolean;
    error: string;
}

const initialState: TasksState = {
    boards: [ITaskState.opened, ITaskState.inProcess, ITaskState.done],
    currentBoardIndex: null,
    tasks: [],
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

        setTasks(state, action: PayloadAction<ITask[]>) {
            state.tasks = action.payload;
            state.tasksIsLoading = false;
        },
    },
});

export const tasksReducer = tasksSlice.reducer;

export const { setTasks, setTasksIsLoading } = tasksSlice.actions;
