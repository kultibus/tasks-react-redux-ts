import { DataVariant, databaseApi, localStorageApi } from "../../../api/api";
import { IProject } from "../../../types/models/IProject";
import { IProjectsData, ITasks, IUpdateData } from "../../../types/types";
import { AppDispatch, AppGetState } from "../../store";
import {
    setDoneTasks,
    setInProcessTasks,
    setOpenedTasks,
} from "../tasks-slice/tasksSlice";
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
            const projectsData: IUpdateData<IProjectsData> = {
                uid: user.uid,
                path: DataVariant.projects,
                data: {
                    currentProject: project,
                    projects: updatedProjects,
                },
            };

            localStorageApi.setLocalData<IProjectsData>(
                projectsData.data,
                DataVariant.projects
            );

            databaseApi.updateData<IProjectsData>(projectsData);
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
            const projectsData: IUpdateData<IProjectsData> = {
                uid: user.uid,
                path: DataVariant.projects,
                data: {
                    currentProject: project,
                    projects: updatedProjects,
                },
            };

            localStorageApi.setLocalData<IProjectsData>(
                projectsData.data,
                DataVariant.projects
            );

            databaseApi.updateData<IProjectsData>(projectsData);
        }
    };

export const updateCurrentProject =
    (project: IProject) => (dispatch: AppDispatch, getState: AppGetState) => {
        const user = getState().userReducer.user;
        const { projects } = getState().projectsReducer;

        dispatch(setCurrentProject(project));

        if (user) {
            const projectsData: IUpdateData<IProjectsData> = {
                uid: user.uid,
                path: DataVariant.projects,
                data: {
                    currentProject: project,
                    projects: projects,
                },
            };

            localStorageApi.setLocalData<IProjectsData>(
                projectsData.data,
                DataVariant.projects
            );

            databaseApi.updateData<IProjectsData>(projectsData);
        }
    };

export const deleteCurrentProject =
    (project: IProject) => (dispatch: AppDispatch, getState: AppGetState) => {
        const user = getState().userReducer.user;
        const { projects } = getState().projectsReducer;

        const updatedProjects = projects.filter(item => item.id !== project.id);

        dispatch(setProjects(updatedProjects));
        dispatch(setCurrentProject(project));

        dispatch(setOpenedTasks([]));
        dispatch(setInProcessTasks([]));
        dispatch(setDoneTasks([]));

        if (user) {
            const projectsData: IUpdateData<IProjectsData> = {
                uid: user.uid,
                path: DataVariant.projects,
                data: {
                    currentProject: project,
                    projects: updatedProjects,
                },
            };

            localStorageApi.setLocalData<IProjectsData>(
                projectsData.data,
                DataVariant.projects
            );

            databaseApi.updateData<IProjectsData>(projectsData);
        }
    };

export const applyProjectsData =
    (projectsData: IProjectsData) => (dispatch: AppDispatch) => {
        const { currentProject, projects } = projectsData;

        dispatch(setProjects(projects));
        dispatch(setCurrentProject(currentProject));
    };
