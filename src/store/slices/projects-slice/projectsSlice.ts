import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProject } from "../../../models/IProject";

interface ProjectsState {
    projects: IProject[];
    isLoading: boolean;
    error: string;
    currentProject: IProject;
}

const initialState: ProjectsState = {
    projects: [],
    currentProject: {} as IProject,
    isLoading: false,
    error: "",
};

export const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        setIsLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        fetchProjects(state, action: PayloadAction<IProject[]>) {
            state.projects = action.payload;
            state.isLoading = false;
        },
        createNew(state, action: PayloadAction<IProject>) {
            state.projects.push(action.payload);
        },
        editCurrent(state, action: PayloadAction<IProject>) {
            state.projects = state.projects.map(project => {
                if (project.id === action.payload.id) {
                    return { ...action.payload };
                }
                return { ...project };
            });
        },
        deleteCurrent(state, action: PayloadAction<IProject>) {
            if (state.projects.length) {
                state.projects = state.projects.filter(project => {
                    if (project.id !== action.payload.id) {
                        return project;
                    }
                });
            } else {
                state.projects = [];
            }
        },
        setCurrent(state, action: PayloadAction<IProject>) {
            state.currentProject = action.payload;
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
    },
});

export const projectsReducer = projectsSlice.reducer;

export const {
    createNew,
    setCurrent,
    editCurrent,
    deleteCurrent,
    fetchProjects,
    setIsLoading,
    setError,
} = projectsSlice.actions;
