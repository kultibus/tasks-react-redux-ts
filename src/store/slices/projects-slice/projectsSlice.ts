import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProject } from "../../../models/IProject";

interface ProjectsState {
    projects: IProject[];
    isLoading: boolean;
    error: string;
    isAuth: boolean;
}

const initialState: ProjectsState = {
    projects: [],
    isLoading: false,
    error: "",
    isAuth: false,
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
        setError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const projectsReducer = projectsSlice.reducer;
