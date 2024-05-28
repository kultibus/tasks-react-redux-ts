import { databaseApi, localStorageApi } from "../../../api/api";
import { IProject } from "../../../types/models/IProject";
import { IUser } from "../../../types/models/IUser";
import { DataVariant, IProjectsData, IUpdatedData } from "../../../types/types";
import { AppDispatch, AppGetState } from "../../store";
import {} from "../tasks-slice/tasksSlice";
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

        updateDatabase(user, updatedProjects);

        updateLocalStorage<IProject[]>(updatedProjects);
    };

export const deleteProject =
    (project: IProject) => (dispatch: AppDispatch, getState: AppGetState) => {
        const user = getState().userReducer.user;
        const { projects } = getState().projectsReducer;

        const updatedProjects = projects.filter(item => item.id !== project.id);

        dispatch(setProjects(updatedProjects));

        updateDatabase(user, updatedProjects);

        updateLocalStorage<IProject[]>(updatedProjects);
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

        updateDatabase(user, updatedProjects);

        updateLocalStorage<IProject[]>(updatedProjects);
    };

export const applyProjects =
    (projects: IProject[]) => (dispatch: AppDispatch) => {
        dispatch(setProjects(projects));
    };

function updateDatabase(user: IUser, updatedData: IProject[]) {
    if (!user) return;

    const databaseData: IUpdatedData<IProjectsData> = {
        uid: user.uid,
        data: { projects: updatedData },
    };

    databaseApi.updateData<IProjectsData>(databaseData);
}

function updateLocalStorage<T>(updatedData: T) {
    localStorageApi.setLocalData<T>(updatedData, DataVariant.projects);
}
