import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITask, ITaskState } from "../../../models/ITask";
import { IBoard } from "../../../models/IBoard";

interface TasksState {
    boards: IBoard[];
    currentBoard: IBoard;
    openedTasks: ITask[];
    inProcessTasks: ITask[];
    doneTasks: ITask[];
    currentTask: ITask;
    tasksIsLoading: boolean;
    error: string;
}

const initialState: TasksState = {
    boards: [
        { name: ITaskState.opened },
        { name: ITaskState.inProcess },
        { name: ITaskState.done },
    ],
    currentBoard: {} as IBoard,
    openedTasks: [],
    inProcessTasks: [],
    doneTasks: [],
    currentTask: {} as ITask,
    tasksIsLoading: false,
    error: "",
};

export const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        setOpenedTasks(state, action: PayloadAction<ITask[]>) {
            state.openedTasks = action.payload;
            state.tasksIsLoading = false;
        },
    },
});

export const tasksReducer = tasksSlice.reducer;

export const { setOpenedTasks } = tasksSlice.actions;
