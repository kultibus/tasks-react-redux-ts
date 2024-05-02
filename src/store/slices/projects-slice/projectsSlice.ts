import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProject } from "../../../models/IProject";

interface ProjectsState {
    projects: IProject[];
    isLoading: boolean;
    error: string;
    currentProject: IProject;
}

const initialState: ProjectsState = {
    // projects: [{ id: "0", name: "0", uid: "0", current: true }],
    projects: [],
    currentProject: {} as IProject,
    isLoading: false,
    error: "",
};

export const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        setIsLoading(state) {
            state.isLoading = true;
        },
        createNew(state, action: PayloadAction<IProject>) {
            state.isLoading = false;
            state.error = "";
            state.projects.push(action.payload);
        },
        editCurrent(state, action: PayloadAction<IProject>) {
            state.isLoading = false;
            state.error = "";
            state.projects = state.projects.map(project => {
                if (project.current) {
                    return { ...action.payload };
                }
                return { ...project };
            });
        },
        deleteCurrent(state) {
            state.isLoading = false;
            state.error = "";
            if (state.projects.length) {
                state.projects = state.projects.filter(
                    project => !project.current
                );
            } else {
                state.projects = [];
            }
        },
        setCurrent(state, action: PayloadAction<IProject>) {
            state.isLoading = false;
            state.error = "";
            state.projects = state.projects.map(project => {
                if (project.id === action.payload.id) {
                    return { ...project, current: true };
                }
                return { ...project, current: false };
            });
            state.currentProject = action.payload;
        },
        setError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const projectsReducer = projectsSlice.reducer;

export const { createNew, setCurrent, editCurrent, deleteCurrent } =
    projectsSlice.actions;
