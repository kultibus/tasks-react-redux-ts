import { databaseApi } from "../../../api/api";
import { IProject } from "../../../types/models/IProject";
import { IDataVariant } from "../../../types/types";
import { updateDatabase, updateLocalStorage } from "../../../utils/updateData";
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

        const projectsData = {
            uid: user.uid,
            data: {
                projects: updatedProjects,
            },
        };

        databaseApi.updateProjects(projectsData);

        // updateDatabase(user, updatedProjects, IDataVariant.projects);
    };

export const deleteProject =
    (project: IProject) => (dispatch: AppDispatch, getState: AppGetState) => {
        const user = getState().userReducer.user;
        const { projects } = getState().projectsReducer;

        const updatedProjects =
            projects.filter(p => p.id !== project.id) || null;

        const projectsData = {
            uid: user.uid,
            data: {
                projects: updatedProjects,
            },
        };

        databaseApi.updateProjects(projectsData);

        // updateDatabase(user, updatedProjects, IDataVariant.projects);
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

        const projectsData = {
            uid: user.uid,
            data: {
                projects: updatedProjects,
            },
        };

        databaseApi.updateProjects(projectsData);

        // updateDatabase(user, updatedProjects, IDataVariant.projects);
    };
