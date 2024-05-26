import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITask } from "../../../types/models/ITask";
import { IProjectTasks, ITasks } from "../../../types/types";
import { IBoardVariant } from "../../../components/boards/Boards";

interface TasksState {
    openedTasks: IProjectTasks[];
    inProcessTasks: IProjectTasks[];
    doneTasks: IProjectTasks[];
    activeTask: ITask;
    activeBoard: IBoardVariant;
    tasksIsLoading: boolean;
    error: string;
}

const initialState: TasksState = {
    // openedTasks: [],
    // inProcessTasks: [],
    // doneTasks: [],
    openedTasks: [
        {
            projectId: "7mccxza",
            tasks: [
                {
                    id: "1",
                    expDate: Date.now(),
                    body: "",
                    title: "1",
                },
                { id: "2", expDate: Date.now(), body: "", title: "2" },
            ],
        },
    ],
    inProcessTasks: [
        {
            projectId: "7mccxza",
            tasks: [
                { id: "3", expDate: Date.now(), body: "", title: "3" },
                { id: "4", expDate: Date.now(), body: "", title: "4" },
            ],
        },
    ],
    doneTasks: [],
    activeTask: {} as ITask,
    activeBoard: IBoardVariant.opened,
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

        setOpenedTasks(state, action: PayloadAction<IProjectTasks[]>) {
            state.openedTasks = action.payload;
            state.tasksIsLoading = false;
        },
        setInProcessTasks(state, action: PayloadAction<IProjectTasks[]>) {
            state.inProcessTasks = action.payload;
            state.tasksIsLoading = false;
        },
        setDoneTasks(state, action: PayloadAction<IProjectTasks[]>) {
            state.doneTasks = action.payload;
            state.tasksIsLoading = false;
        },

        setActiveTask(state, action: PayloadAction<ITask>) {
            state.activeTask = action.payload;
        },
        setActiveBoard(state, action: PayloadAction<IBoardVariant>) {
            state.activeBoard = action.payload;
        },
    },
});

export const tasksReducer = tasksSlice.reducer;

export const {
    setOpenedTasks,
    setInProcessTasks,
    setDoneTasks,
    setTasksIsLoading,
    setActiveTask,
    setActiveBoard,
} = tasksSlice.actions;
