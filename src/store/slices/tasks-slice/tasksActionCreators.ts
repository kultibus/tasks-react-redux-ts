import {
    LocalDataVariant,
    databaseApi,
    localStorageApi,
} from "../../../api/api";
import { ITask } from "../../../types/models/ITask";
import {
    IProjectTasks,
    ITasks,
    ITasksData,
    IUpdateData,
} from "../../../types/types";
import { AppDispatch, AppGetState } from "../../store";
import { setCurrentTask, setOpened, setTasksIsLoading } from "./tasksSlice";

export const createNewTask =
    (newTask: ITask) => (dispatch: AppDispatch, getState: AppGetState) => {
        const user = getState().userReducer.user;
        const { opened, inProcess, done } = getState().tasksReducer;
        const { currentProject } = getState().projectsReducer;

        const currentOpened = opened.find(
            t => t.projectId === currentProject.id
        );

        const updatedCurrentOpened = {
            ...currentOpened,
            tasks: [...currentOpened.tasks, newTask],
        };

        const updatedOpened = opened.map(t => {
            if (t.projectId === currentProject.id) {
                return updatedCurrentOpened;
            }
            return t;
        });

        dispatch(setOpened(updatedOpened));

        // if (user) {
        //     const tasksData: IUpdateData<ITasksData> = {
        //         uid: user.uid,
        //         data: {
        //             [currentProject.id]: {
        //                 opened: updatedOpened,
        //                 inProcess: inProcess,
        //                 done: done,
        //             },
        //         },
        //     };

        //     localStorageApi.setLocalData<ITasks>(
        //         tasksData.data[currentProject.id],
        //         currentProject.id
        //     );

        //     databaseApi.updateData<ITasksData>(tasksData);
        // }
    };

export const editTask =
    (task: ITask) => (dispatch: AppDispatch, getState: AppGetState) => {
        const user = getState().userReducer.user;
        const { tasks } = getState().tasksReducer;

        const currentTaskIndex = tasks.findIndex(item => item.id === task.id);

        const updatedTasks = [...tasks];

        updatedTasks.splice(currentTaskIndex, 1, task);

        dispatch(setTasks(updatedTasks));
        dispatch(setCurrentTask({} as ITask));

        if (user) {
            const tasksData: IUpdateData<ITasksData> = {
                uid: user.uid,
                data: { tasks: updatedTasks },
            };

            localStorageApi.setLocalData<ITasksData>(
                tasksData.data,
                LocalDataVariant.tasks
            );

            databaseApi.updateData<ITasksData>(tasksData);
        }
    };

export const updateCurrentTask =
    (task: ITask) => (dispatch: AppDispatch, getState: AppGetState) => {
        dispatch(setCurrentTask(task));
    };

export const deleteTask =
    (task: ITask) => (dispatch: AppDispatch, getState: AppGetState) => {
        const user = getState().userReducer.user;
        const { tasks } = getState().tasksReducer;

        const updatedTasks = tasks.filter(item => {
            if (item.id !== task.id) {
                return item;
            }
        });

        dispatch(setTasks(updatedTasks));
        dispatch(setCurrentTask({} as ITask));

        if (user) {
            const tasksData: IUpdateData<ITasksData> = {
                uid: user.uid,
                data: { tasks: updatedTasks },
            };

            localStorageApi.setLocalData<ITasksData>(
                tasksData.data,
                LocalDataVariant.tasks
            );

            databaseApi.updateData<ITasksData>(tasksData);
        }
    };

export const applyTasksData =
    (tasksData: ITasksData) =>
    (dispatch: AppDispatch, getState: AppGetState) => {
        const { currentProject } = getState().projectsReducer;

        console.log(tasksData);

        // dispatch(setTasks(tasks));
    };
