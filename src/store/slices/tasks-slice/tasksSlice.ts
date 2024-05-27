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
                    body: "This way, you can create two versions of your component, one that is presentational, and one that is draggable and renders the presentational component without the need for additional wrapper elements:",
                    title: "1",
                },
                { id: "2", expDate: Date.now(), body: "mponent without the need for additional wrappe", title: "2" },
                { id: "3", expDate: Date.now(), body: "wo versions of your component, one that is presentational, and one that is ", title: "3" },
            ],
        },
    ],
    inProcessTasks: [
        {
            projectId: "7mccxza",
            tasks: [
                { id: "4", expDate: Date.now(), body: "n should be a string that represents a valid CSS easing function. The defaul", title: "4" },
                { id: "5", expDate: Date.now(), body: "Modifiers let you dynamically modify the movement coordinate", title: "5" },
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
