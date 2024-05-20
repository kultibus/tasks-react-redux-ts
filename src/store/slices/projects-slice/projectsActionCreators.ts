import {
    localStorageApi,
    databaseApi,
    LocalDataVariant,
} from "../../../api/api";
import { IProject } from "../../../types/models/IProject";
import { IProjectsData, IUpdateData } from "../../../types/types";
import { AppDispatch, AppGetState } from "../../store";
import { setTasks } from "../tasks-slice/tasksSlice";
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
                data: {
                    currentProject: project,
                    projects: updatedProjects,
                },
            };

            localStorageApi.setLocalData<IProjectsData>(
                projectsData.data,
                LocalDataVariant.projects
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
                data: {
                    currentProject: project,
                    projects: updatedProjects,
                },
            };

            localStorageApi.setLocalData<IProjectsData>(
                projectsData.data,
                LocalDataVariant.projects
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
                data: {
                    currentProject: project,
                    projects: projects,
                },
            };

            localStorageApi.setLocalData<IProjectsData>(
                projectsData.data,
                LocalDataVariant.projects
            );

            databaseApi.updateData<IProjectsData>(projectsData);
        }
    };

export const deleteCurrentProject =
    (project: IProject) => (dispatch: AppDispatch, getState: AppGetState) => {
        const user = getState().userReducer.user;
        const { projects } = getState().projectsReducer;
        const { tasks } = getState().tasksReducer;

        const updatedProjects = projects.filter(item => item.id !== project.id);

        const updatedTasks = tasks.filter(
            item => item.projectId !== project.id
        );

        dispatch(setProjects(updatedProjects));
        dispatch(setCurrentProject(project));

        dispatch(setTasks(updatedTasks));

        if (user) {
            const projectsData: IUpdateData<IProjectsData> = {
                uid: user.uid,
                data: {
                    currentProject: project,
                    projects: updatedProjects,
                },
            };

            localStorageApi.setLocalData<IProjectsData>(
                projectsData.data,
                LocalDataVariant.projects
            );

            databaseApi.updateData<IProjectsData>(projectsData);
        }
    };

export const applyProjectsData =
    (projectsData: IProjectsData) => (dispatch: AppDispatch) => {
        dispatch(setProjectsIsLoading(true));

        const { currentProject, projects } = projectsData;

        dispatch(setProjects(projects));
        dispatch(setCurrentProject(currentProject));
    };
