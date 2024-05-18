import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProject } from "../../../types/models/IProject";

interface ProjectsState {
    projects: IProject[];
    projectsIsLoading: boolean;
    error: string;
    currentProject: IProject;
}

const initialState: ProjectsState = {
    projects: [],
    currentProject: {} as IProject,
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

        setCurrentProject(state, action: PayloadAction<IProject>) {
            state.currentProject = action.payload;
        },

        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
    },
});

export const projectsReducer = projectsSlice.reducer;

export const {
    setProjects,
    setCurrentProject,
    setProjectsIsLoading,
    setError,
} = projectsSlice.actions;
