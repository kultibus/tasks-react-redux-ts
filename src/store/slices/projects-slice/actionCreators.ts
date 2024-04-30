import { IProject } from "../../../models/IProject";
import { AppDispatch } from "../../store";
import { projectsSlice } from "./projectsSlice";

// export type ICreateNewProject = (
//     projects: IProject[],
//     project: IProject
// ) => (dispatch: AppDispatch) => Promise<void>;
export type ICreateNewProject = (
    // projects: IProject[],
    project: IProject
) => (dispatch: AppDispatch) => void;

export const createNewProject: ICreateNewProject =
    project => async (dispatch: AppDispatch) => {
        try {
            // dispatch(projectsSlice.actions.setIsLoading());

            dispatch(projectsSlice.actions.addProject(project));
            dispatch(projectsSlice.actions.setCurrentProject(project));
        } catch (error) {
            dispatch(projectsSlice.actions.setError(error.message));
        }
    };
