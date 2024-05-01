import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IForm, IFormVariant } from "../../../models/IForm";
import { ITask } from "../../../models/ITask";

interface TasksState {
    tasks: ITask[];
    isLoading: boolean;
    error: string;
    form: IForm;
}

const initialState: TasksState = {
    tasks: [],
    isLoading: false,
    error: "",
    form: {
        isOpened: false,
        state: IFormVariant.initial,
    },
};

export const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        setIsLoading(state) {
            state.isLoading = true;
        },
        pushNewTask(state, action: PayloadAction<ITask>) {
            state.isLoading = false;
            state.error = "";
            state.tasks.push(action.payload);
            state.form.isOpened = false;
            state.form.state = IFormVariant.initial;
        },
        editCurrentTask(state, action: PayloadAction<ITask>) {
            state.isLoading = false;
            state.error = "";
            state.tasks = state.tasks.map(task => {
                if (task.current) {
                    return { ...action.payload };
                }
                return { ...task };
            });
            state.form.isOpened = false;
            state.form.state = IFormVariant.initial;
        },
        deleteCurrentTask(state) {
            state.isLoading = false;
            state.error = "";
            if (state.tasks.length) {
                state.tasks = state.tasks.filter(task => !task.current);
            } else {
                state.tasks = [];
            }
            state.form.isOpened = false;
            state.form.state = IFormVariant.initial;
        },
        setCurrentTask(state, action: PayloadAction<ITask>) {
            state.isLoading = false;
            state.error = "";
            state.tasks = state.tasks.map(task => {
                if (task.id === action.payload.id) {
                    return { ...task, current: true };
                }
                return { ...task, current: false };
            });
        },
        setIsFormOpened(state, action: PayloadAction<boolean>) {
            state.form.isOpened = action.payload;
        },
        setFormState(state, action: PayloadAction<IFormVariant>) {
            state.form.state = action.payload;
        },
        setError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const tasksReducer = tasksSlice.reducer;
