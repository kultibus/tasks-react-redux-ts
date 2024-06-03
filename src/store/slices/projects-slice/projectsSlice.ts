import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProject } from "../../../types/models/IProject";

interface ProjectsState {
    projects: IProject[];
    activeProject: IProject | null;
    projectsIsLoading: boolean;
    error: string;
}

const initialState: ProjectsState = {
    projects: [],
    activeProject: null,
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

        setActiveProject(state, action: PayloadAction<IProject | null>) {
            state.activeProject = action.payload;
        },

        setProjectError(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.projectsIsLoading = false;
        },
    },
});

export const projectsReducer = projectsSlice.reducer;

export const {
    setProjects,
    setProjectsIsLoading,
    setProjectError,
    setActiveProject,
} = projectsSlice.actions;
