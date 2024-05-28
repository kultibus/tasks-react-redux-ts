import { IProject } from "../../../types/models/IProject";
import { DataVariant } from "../../../types/types";
import { updateDatabase, updateLocalStorage } from "../../../utils/updateData";
import { AppDispatch, AppGetState } from "../../store";
import { } from "../tasks-slice/tasksSlice";
import { setProjects } from "./projectsSlice";

export const createProject =
    (project: IProject) => (dispatch: AppDispatch, getState: AppGetState) => {
        const user = getState().userReducer.user;
        const { projects } = getState().projectsReducer;

        const updatedProjects = projects.map(p => {
            return { ...p, isActive: false };
        });

        updatedProjects.push(project);

        dispatch(setProjects(updatedProjects));

        updateDatabase(user, updatedProjects, DataVariant.projects);

        updateLocalStorage<IProject[]>(updatedProjects, DataVariant.projects);
    };

export const deleteProject =
    (project: IProject) => (dispatch: AppDispatch, getState: AppGetState) => {
        const user = getState().userReducer.user;
        const { projects } = getState().projectsReducer;

        const updatedProjects = projects.filter(p => p.id !== project.id);

        dispatch(setProjects(updatedProjects));

        updateDatabase(user, updatedProjects, DataVariant.projects);

        updateLocalStorage<IProject[]>(updatedProjects, DataVariant.projects);
    };

export const updateProjects =
    (project: IProject) => (dispatch: AppDispatch, getState: AppGetState) => {
        const user = getState().userReducer.user;
        const { projects } = getState().projectsReducer;

        const updatedProjects = projects.map(p => {
            if (p.id === project.id) {
                return { ...project, isActive: true };
            }
            return { ...p, isActive: false };
        });

        dispatch(setProjects(updatedProjects));

        updateDatabase(user, updatedProjects, DataVariant.projects);

        updateLocalStorage<IProject[]>(updatedProjects, DataVariant.projects);
    };

export const applyProjects =
    (projects: IProject[]) => (dispatch: AppDispatch) => {
        dispatch(setProjects(projects));
    };
