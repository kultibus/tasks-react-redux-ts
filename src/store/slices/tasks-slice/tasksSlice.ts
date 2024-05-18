import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITask } from "../../../types/models/ITask";
import { IBoard, IBoardName } from "../../../types/models/IBoard";

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
        { name: IBoardName.opened },
        { name: IBoardName.inProcess },
        { name: IBoardName.done },
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
        setTasksIsLoading(state, action: PayloadAction<boolean>) {
            state.tasksIsLoading = action.payload;
        },

        setOpenedTasks(state, action: PayloadAction<ITask[]>) {
            state.openedTasks = action.payload;
            state.tasksIsLoading = false;
        },
    },
});

export const tasksReducer = tasksSlice.reducer;

export const { setOpenedTasks, setTasksIsLoading } = tasksSlice.actions;
