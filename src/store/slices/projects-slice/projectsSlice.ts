import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProject } from "../../../models/IProject";

export enum IFormState {
    initial = "Create new project",
    add = "Add new project",
    edit = "Edit project",
    delete = "Delete project",
}

interface ProjectsState {
    projects: IProject[];
    isLoading: boolean;
    error: string;
    isFormOpened: boolean;
    formState: IFormState;
}

const initialState: ProjectsState = {
    projects: [],
    isLoading: false,
    error: "",
    isFormOpened: false,
    formState: IFormState.initial,
};

export const projectsSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsLoading(state) {
            state.isLoading = true;
        },
        pushNewProject(state, action: PayloadAction<IProject>) {
            state.isLoading = false;
            state.error = "";
            state.projects.push(action.payload);
            state.isFormOpened = false;
            state.formState = IFormState.initial;
        },
        editCurrentProject(state, action: PayloadAction<IProject>) {
            state.isLoading = false;
            state.error = "";
            state.projects = state.projects.map(project => {
                if (project.current) {
                    return { ...action.payload };
                }
                return { ...project };
            });
            state.isFormOpened = false;
            state.formState = IFormState.initial;
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
            state.formState = IFormState.initial;
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
