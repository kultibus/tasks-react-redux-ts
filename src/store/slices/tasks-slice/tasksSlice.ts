import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITask } from "../../../types/models/ITask";
import { IProjectTasks, ITasks } from "../../../types/types";
import { IBoardVariant } from "../../../components/boards/Boards";

interface TasksState {
    activeTask: ITask;
    // activeBoard: IBoardVariant;
    tasksIsLoading: boolean;
    error: string;
}

const initialState: TasksState = {
    activeTask: {} as ITask,
    // activeBoard: IBoardVariant.opened,
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


        setActiveTask(state, action: PayloadAction<ITask>) {
            state.activeTask = action.payload;
        },
        // setActiveBoard(state, action: PayloadAction<IBoardVariant>) {
        //     state.activeBoard = action.payload;
        // },
    },
});

export const tasksReducer = tasksSlice.reducer;

export const {
    setTasksIsLoading,
    setActiveTask,
    // setActiveBoard,
} = tasksSlice.actions;
