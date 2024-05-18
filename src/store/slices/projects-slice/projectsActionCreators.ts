import { localStorageApi, databaseApi } from "../../../api/api";
import { IProject } from "../../../types/models/IProject";
import { IProjectsData, IUpdateData } from "../../../types/types";
import { AppDispatch, AppGetState } from "../../store";
import {
    setCurrentProject,
    setProjects,
    setProjectsIsLoading,
} from "./projectsSlice";

export const createNewProject =
    (project: IProject) => (dispatch: AppDispatch, getState: AppGetState) => {
        const user = getState().userReducer.user;
        const { projects } = getState().projectsReducer;

        const updatedProjects = [...projects, project];

        dispatch(setProjects(updatedProjects));
        dispatch(setCurrentProject(project));

        if (user) {
            const updatedProjectsData: IUpdateData<IProjectsData> = {
                uid: user.uid,
                data: {
                    currentProject: project,
                    projects: updatedProjects,
                },
            };

            localStorageApi.setProjects(updatedProjectsData.data);

            databaseApi.updateProjects(updatedProjectsData);
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
            const updatedProjectsData: IUpdateData<IProjectsData> = {
                uid: user.uid,
                data: {
                    currentProject: project,
                    projects: updatedProjects,
                },
            };

            localStorageApi.setProjects(updatedProjectsData.data);

            databaseApi.updateProjects(updatedProjectsData);
        }
    };

export const updateCurrentProject =
    (project: IProject) => (dispatch: AppDispatch, getState: AppGetState) => {
        const user = getState().userReducer.user;
        const { projects } = getState().projectsReducer;

        dispatch(setCurrentProject(project));

        if (user) {
            const updatedProjectsData: IUpdateData<IProjectsData> = {
                uid: user.uid,
                data: {
                    currentProject: project,
                    projects: projects,
                },
            };

            localStorageApi.setProjects(updatedProjectsData.data);

            databaseApi.updateProjects(updatedProjectsData);
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
            const updatedProjectsData: IUpdateData<IProjectsData> = {
                uid: user.uid,
                data: {
                    currentProject: project,
                    projects: updatedProjects,
                },
            };

            localStorageApi.setProjects(updatedProjectsData.data);

            databaseApi.updateProjects(updatedProjectsData);
        }
    };

export const applyProjectsData =
    (projectsData: IProjectsData) => (dispatch: AppDispatch) => {
        dispatch(setProjectsIsLoading(true));

        const { currentProject, projects } = projectsData;

        dispatch(setProjects(projects));
        dispatch(setCurrentProject(currentProject));
    };
