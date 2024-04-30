import { IProject } from "../../../models/IProject";
import { AppDispatch } from "../../store";
import { projectsSlice } from "./projectsSlice";

// export type IProjectActionCreator = (
//     projects: IProject[],
//     project: IProject
// ) => (dispatch: AppDispatch) => Promise<void>;
export type IProjectActionCreator = (
    // projects: IProject[],
    project?: IProject,
    currentProjectIndex?: number,
    projects?: IProject[]
) => (dispatch: AppDispatch) => void;

export const createNewProject: IProjectActionCreator =
    project => async (dispatch: AppDispatch) => {
        try {
            // dispatch(projectsSlice.actions.setIsLoading());

            dispatch(projectsSlice.actions.addProject(project));

            dispatch(projectsSlice.actions.setCurrentProject(project));
        } catch (error) {
            dispatch(projectsSlice.actions.setError(error.message));
        }
    };

export const deleteProject: IProjectActionCreator =
    project => async (dispatch: AppDispatch) => {
        try {
            dispatch(projectsSlice.actions.deleteCurrentProject());

            if (project) {
                dispatch(projectsSlice.actions.setCurrentProject(project));
            }
        } catch (error) {
            dispatch(projectsSlice.actions.setError(error.message));
        }
    };
