import { databaseApi, localStorageApi } from "../../../api/api";
import { ITask } from "../../../types/models/ITask";
import { ITasksData, IUpdateData } from "../../../types/types";
import { AppDispatch, AppGetState } from "../../store";
import { setOpenedTasks, setTasksIsLoading } from "./tasksSlice";

export const createNewTask =
    (task: ITask) => (dispatch: AppDispatch, getState: AppGetState) => {
        const user = getState().userReducer.user;
        const { openedTasks, inProcessTasks, doneTasks } =
            getState().tasksReducer;

        const updatedOpenedTasks = [...openedTasks, task];

        dispatch(setOpenedTasks(updatedOpenedTasks));

        if (user) {
            const tasksData: IUpdateData<ITasksData> = {
                uid: user.uid,
                data: { openedTasks: updatedOpenedTasks },
            };

            localStorageApi.setTasks(tasksData.data);

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

export const applyTasksData =
    (tasksData: ITasksData) => (dispatch: AppDispatch) => {
        dispatch(setTasksIsLoading(true));

        const { openedTasks, inProcessTasks, doneTasks } = tasksData;

        dispatch(setOpenedTasks(openedTasks));
    };
