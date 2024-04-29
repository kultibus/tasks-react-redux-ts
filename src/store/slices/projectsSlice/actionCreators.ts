import { IProject } from "../../../models/IProject";
import { AppDispatch } from "../../store";
import { projectsSlice } from "./projectsSlice";

// export type ICreateNewProject = (
//     projects: IProject[],
//     project: IProject
// ) => (dispatch: AppDispatch) => Promise<void>;
export type ICreateNewProject = (
    projects: IProject[],
    project: IProject
) => (dispatch: AppDispatch) => void;

export const createNewProject: ICreateNewProject =
    (projects, project) => async (dispatch: AppDispatch) => {
        try {
            dispatch(projectsSlice.actions.setIsLoading());

            dispatch(projectsSlice.actions.setProjects([...projects, project]));

			localStorage.setItem("projects", "true");


        } catch (error) {
            dispatch(projectsSlice.actions.setError(error.message));
        }
    };
