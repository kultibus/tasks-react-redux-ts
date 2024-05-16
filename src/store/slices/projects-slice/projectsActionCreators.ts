import { localStorageApi, projectsApi } from "../../../api/api";
import { IProject } from "../../../models/IProject";
import { AppDispatch, AppGetState } from "../../store";
import {
    setCurrentProject,
    setProjects,
    setProjectsIsLoading,
} from "./projectsSlice";

export interface IProjectsData {
    currentProject: IProject;
    projects: IProject[];
}

export interface IUpdatedData {
    uid: string;
    projectsData: IProjectsData;
}

export const createNewProject =
    (project: IProject) => (dispatch: AppDispatch, getState: AppGetState) => {
        const user = getState().userReducer.user;
        const { projects } = getState().projectsReducer;

        const updatedProjects = [...projects, project];

        dispatch(setProjects(updatedProjects));
        dispatch(setCurrentProject(project));

        if (user) {
            const userData: IUpdatedData = {
                uid: user.uid,
                projectsData: {
                    currentProject: project,
                    projects: updatedProjects,
                },
            };

            localStorageApi.setProjects(userData.projectsData);

            projectsApi.updateData(userData);
        }
    };

export const editCurrentProject =
    (project: IProject) => (dispatch: AppDispatch, getState: AppGetState) => {
        const user = getState().userReducer.user;
        const { projects } = getState().projectsReducer;

        const currentProjectIndex = projects.findIndex(
            item => item.id === project.id
        );

        const updatedProjects = [...projects];

        updatedProjects.splice(currentProjectIndex, 1, project);

        dispatch(setProjects(updatedProjects));
        dispatch(setCurrentProject(project));

        if (user) {
            const userData: IUpdatedData = {
                uid: user.uid,
                projectsData: {
                    currentProject: project,
                    projects: updatedProjects,
                },
            };

            localStorageApi.setProjects(userData.projectsData);

            projectsApi.updateData(userData);
        }
    };

export const updateCurrentProject =
    (project: IProject) => (dispatch: AppDispatch, getState: AppGetState) => {
        const user = getState().userReducer.user;
        const { projects } = getState().projectsReducer;

        dispatch(setCurrentProject(project));

        if (user) {
            const userData: IUpdatedData = {
                uid: user.uid,
                projectsData: {
                    currentProject: project,
                    projects: projects,
                },
            };

            localStorageApi.setProjects(userData.projectsData);

            projectsApi.updateData(userData);
        }
    };

export const deleteCurrentProject =
    (project: IProject) => (dispatch: AppDispatch, getState: AppGetState) => {
        const user = getState().userReducer.user;
        const { projects } = getState().projectsReducer;

        const updatedProjects = projects.filter(item => {
            if (item.id !== project.id) {
                return item;
            }
        });

        dispatch(setProjects(updatedProjects));
        dispatch(setCurrentProject(project));

        if (user) {
            const userData: IUpdatedData = {
                uid: user.uid,
                projectsData: {
                    currentProject: project,
                    projects: updatedProjects,
                },
            };

            localStorageApi.setProjects(userData.projectsData);

            projectsApi.updateData(userData);
        }
    };

export const applyProjectsData =
    (projectsData: IProjectsData) => (dispatch: AppDispatch) => {
        dispatch(setProjectsIsLoading(true));

        const { currentProject, projects } = projectsData;

        dispatch(setProjects(projects));
        dispatch(setCurrentProject(currentProject));
    };
