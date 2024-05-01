import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITask } from "../../../models/ITask";

interface TasksState {
    tasks: ITask[];
    isLoading: boolean;
    error: string;
}

const initialState: TasksState = {
    tasks: [],
    isLoading: false,
    error: "",
};

export const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        setIsLoading(state) {
            state.isLoading = true;
        },
        createNew(state, action: PayloadAction<ITask>) {
            state.isLoading = false;
            state.error = "";
            state.tasks.push(action.payload);
        },
        editCurrent(state, action: PayloadAction<ITask>) {
            state.isLoading = false;
            state.error = "";
            state.tasks = state.tasks.map(task => {
                if (task.current) {
                    return { ...action.payload };
                }
                return { ...task };
            });
        },
        deleteCurrent(state) {
            state.isLoading = false;
            state.error = "";
            if (state.tasks.length) {
                state.tasks = state.tasks.filter(task => !task.current);
            } else {
                state.tasks = [];
            }
        },
        setCurrent(state, action: PayloadAction<ITask>) {
            state.isLoading = false;
            state.error = "";
            state.tasks = state.tasks.map(task => {
                if (task.id === action.payload.id) {
                    return { ...task, current: true };
                }
                return { ...task, current: false };
            });
        },
        setError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const tasksReducer = tasksSlice.reducer;
