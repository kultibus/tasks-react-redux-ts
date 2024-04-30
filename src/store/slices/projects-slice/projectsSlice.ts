import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProject } from "../../../models/IProject";

type IFormState = "" | "Delete" | "Edit";

interface ProjectsState {
    projects: IProject[];
    isLoading: boolean;
    error: string;
    isFormOpened: boolean;
    formState: IFormState;
    // isAuth: boolean;
}

const initialState: ProjectsState = {
    projects: [],
    isLoading: false,
    error: "",
    isFormOpened: false,
    formState: "",
    // isAuth: false,
};

export const projectsSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsLoading(state) {
            state.isLoading = true;
        },
        addProject(state, action: PayloadAction<IProject>) {
            state.isLoading = false;
            state.error = "";
            state.projects.push(action.payload);
            state.isFormOpened = false;
        },
        deleteCurrentProject(state) {
            state.isLoading = false;
            state.error = "";
            if (state.projects.length) {
                state.projects = state.projects.filter(
                    project => !project.current
                );
            } else {
                state.projects = [];
            }
            state.isFormOpened = false;
        },
        setCurrentProject(state, action: PayloadAction<IProject>) {
            state.isLoading = false;
            state.error = "";
            state.projects = state.projects.map(project => {
                if (project.id === action.payload.id) {
                    return { ...project, current: true };
                }
                return { ...project, current: false };
            });
        },
        setIsFormOpened(state, action: PayloadAction<boolean>) {
            state.isFormOpened = action.payload;
            state.formState = "";
        },
        setFormState(state, action: PayloadAction<IFormState>) {
            state.formState = action.payload;
        },
        setError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const projectsReducer = projectsSlice.reducer;
