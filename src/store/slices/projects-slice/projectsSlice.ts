import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProject } from "../../../types/models/IProject";

interface ProjectsState {
    projects: IProject[];
    projectsIsLoading: boolean;
    error: string;
}

const initialState: ProjectsState = {
    projects: [],
    projectsIsLoading: false,
    error: "",
};

export const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        setProjectsIsLoading(state, action: PayloadAction<boolean>) {
            state.projectsIsLoading = action.payload;
        },

        setProjects(state, action: PayloadAction<IProject[]>) {
            state.projects = action.payload;
            state.projectsIsLoading = false;
        },

        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
    },
});

export const projectsReducer = projectsSlice.reducer;

export const { setProjects, setProjectsIsLoading, setError } =
    projectsSlice.actions;
