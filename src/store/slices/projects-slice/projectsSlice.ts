import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IForm, IFormState } from "../../../models/IForm";
import { IProject } from "../../../models/IProject";

interface ProjectsState {
    projects: IProject[];
    isLoading: boolean;
    error: string;
    form: IForm;
}

const initialState: ProjectsState = {
    projects: [],
    isLoading: false,
    error: "",
    form: {
        isOpened: false,
        state: IFormState.initial,
    },
};

export const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        setIsLoading(state) {
            state.isLoading = true;
        },
        pushNewProject(state, action: PayloadAction<IProject>) {
            state.isLoading = false;
            state.error = "";
            state.projects.push(action.payload);
            state.form.isOpened = false;
            state.form.state = IFormState.initial;
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
            state.form.isOpened = false;
            state.form.state = IFormState.initial;
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
            state.form.isOpened = false;
            state.form.state = IFormState.initial;
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
            state.form.isOpened = action.payload;
        },
        setFormState(state, action: PayloadAction<IFormState>) {
            state.form.state = action.payload;
        },
        setError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const projectsReducer = projectsSlice.reducer;
