import { databaseApi } from "../../../api/api";
import { ITask } from "../../../types/models/ITask";
import { ITasksData, ITasksUpdateData } from "../../../types/types";
import { AppDispatch, AppGetState } from "../../store";
import { setOpenedTasks } from "./tasksSlice";

export const createNewTask =
    (task: ITask) => (dispatch: AppDispatch, getState: AppGetState) => {
        const user = getState().userReducer.user;
        const { openedTasks, inProcessTasks, doneTasks } =
            getState().tasksReducer;
        const { projects, currentProject } = getState().projectsReducer;

        const updatedOpenedTasks = [...openedTasks, task];

        dispatch(setOpenedTasks(updatedOpenedTasks));
        // dispatch(setCurrentProject(project));

        if (user) {
            const tasksData: ITasksUpdateData<ITasksData> = {
                uid: user.uid,
            };

            // localStorageApi.setProjects(userData.projectsData);

            databaseApi.updateTasks(tasksData);
        }
    };

// export const editCurrentProject =
//     (project: IProject) => (dispatch: AppDispatch, getState: AppGetState) => {
//         const user = getState().userReducer.user;
//         const { projects } = getState().projectsReducer;

//         const currentProjectIndex = projects.findIndex(
//             item => item.id === project.id
//         );

//         const updatedProjects = [...projects];

//         updatedProjects.splice(currentProjectIndex, 1, project);

//         dispatch(setProjects(updatedProjects));
//         dispatch(setCurrentProject(project));

//         if (user) {
//             const userData: IUpdatedProjectsData = {
//                 uid: user.uid,
//                 projectsData: {
//                     currentProject: project,
//                     projects: updatedProjects,
//                 },
//             };

//             localStorageApi.setProjects(userData.projectsData);

//             databaseApi.updateProjects(userData);
//         }
//     };

// export const updateCurrentProject =
//     (project: IProject) => (dispatch: AppDispatch, getState: AppGetState) => {
//         const user = getState().userReducer.user;
//         const { projects } = getState().projectsReducer;

//         dispatch(setCurrentProject(project));

//         if (user) {
//             const userData: IUpdatedProjectsData = {
//                 uid: user.uid,
//                 projectsData: {
//                     currentProject: project,
//                     projects: projects,
//                 },
//             };

//             localStorageApi.setProjects(userData.projectsData);

//             databaseApi.updateProjects(userData);
//         }
//     };

// export const deleteCurrentProject =
//     (project: IProject) => (dispatch: AppDispatch, getState: AppGetState) => {
//         const user = getState().userReducer.user;
//         const { projects } = getState().projectsReducer;

//         const updatedProjects = projects.filter(item => {
//             if (item.id !== project.id) {
//                 return item;
//             }
//         });

//         dispatch(setProjects(updatedProjects));
//         dispatch(setCurrentProject(project));

//         if (user) {
//             const userData: IUpdatedProjectsData = {
//                 uid: user.uid,
//                 projectsData: {
//                     currentProject: project,
//                     projects: updatedProjects,
//                 },
//             };

//             localStorageApi.setProjects(userData.projectsData);

//             databaseApi.updateProjects(userData);
//         }
//     };

// export const applyProjectsData =
//     (projectsData: IProjectsData) => (dispatch: AppDispatch) => {
//         dispatch(setProjectsIsLoading(true));

//         const { currentProject, projects } = projectsData;

//         dispatch(setProjects(projects));
//         dispatch(setCurrentProject(currentProject));
//     };
