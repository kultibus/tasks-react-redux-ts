import { LocalDataVariant, databaseApi, localStorageApi } from "../../../api/api";
import { ITask } from "../../../types/models/ITask";
import { ITasksData, IUpdateData } from "../../../types/types";
import { AppDispatch, AppGetState } from "../../store";
import { setCurrentTask, setTasks, setTasksIsLoading } from "./tasksSlice";

export const createNewTask =
    (task: ITask) => (dispatch: AppDispatch, getState: AppGetState) => {
        const user = getState().userReducer.user;
        const { tasks } = getState().tasksReducer;

        const updatedTasks = tasks ? [...tasks, task] : [task];

        dispatch(setTasks(updatedTasks));

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
        // const user = getState().userReducer.user;
        // const { tasks } = getState().tasksReducer;

        // const updatedTasks = [...tasks, task];

        dispatch(setCurrentTask(task));

        // if (user) {
        //     const tasksData: IUpdateData<ITasksData> = {
        //         uid: user.uid,
        //         data: { tasks: updatedTasks },
        //     };
        //     localStorageApi.setTasks(tasksData.data);
        //     databaseApi.updateTasks(tasksData);
        // }
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
    (tasksData: ITasksData) => (dispatch: AppDispatch) => {
        dispatch(setTasksIsLoading(true));

        const { tasks } = tasksData;

        dispatch(setTasks(tasks));
    };
