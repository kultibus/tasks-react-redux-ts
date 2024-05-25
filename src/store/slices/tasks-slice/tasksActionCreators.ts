import { DataVariant, databaseApi, localStorageApi } from "../../../api/api";
import { ITask } from "../../../types/models/ITask";
import { ITasks, IUpdateData } from "../../../types/types";
import { AppDispatch, AppGetState } from "../../store";
import { setActiveTask, setOpenedTasks, setTasksIsLoading } from "./tasksSlice";

export const createNewTask =
    (newTask: ITask) => (dispatch: AppDispatch, getState: AppGetState) => {
        const user = getState().userReducer.user;
        const { openedTasks, inProcessTasks, doneTasks } =
            getState().tasksReducer;
        const { currentProject } = getState().projectsReducer;

        const currentData = openedTasks.find(
            t => t.projectId === currentProject.id
        );

        const updatedCurrentData = currentData
            ? {
                  ...currentData,
                  tasks: [...currentData.tasks, newTask],
              }
            : { projectId: currentProject.id, tasks: [newTask] };

        const updatedOpenedTasks = currentData
            ? openedTasks.map(t => {
                  if (t.projectId === currentProject.id) {
                      return updatedCurrentData;
                  }
                  return t;
              })
            : [...openedTasks, updatedCurrentData];

        dispatch(setOpenedTasks(updatedOpenedTasks));

        // if (user) {
        //     const tasksData: IUpdateData<ITasks> = {
        //         uid: user.uid,
        //         path: DataVariant.tasks,
        //         data: {
        //             opened: updatedOpenedTasks,
        //             inProcess: inProcessTasks,
        //             done: doneTasks,
        //         },
        //     };

        //     localStorageApi.setLocalData<ITasks>(
        //         tasksData.data,
        //         DataVariant.tasks
        //     );

        //     databaseApi.updateData<ITasks>(tasksData);
        // }
    };

export const updateActiveTask =
    (taskId: string) => (dispatch: AppDispatch, getState: AppGetState) => {
        const { openedTasks, inProcessTasks, doneTasks } =
            getState().tasksReducer;

        const activeTask = [
            ...openedTasks.map(t => t.tasks),
            ...inProcessTasks.map(t => t.tasks),
            ...doneTasks.map(t => t.tasks),
        ]
            .reduce((res, t) => [...res, ...t], [])
            .find(t => t.id === taskId);

        dispatch(setActiveTask(activeTask));
    };

export const editTask =
    (editedTask: ITask) => (dispatch: AppDispatch, getState: AppGetState) => {
        const user = getState().userReducer.user;
        const { openedTasks, inProcessTasks, doneTasks } =
            getState().tasksReducer;
        const { currentProject } = getState().projectsReducer;


        // if (user) {
        //     const tasksData: IUpdateData<ITasksData> = {
        //         uid: user.uid,
        //         data: { tasks: updatedTasks },
        //     };

        //     localStorageApi.setLocalData<ITasksData>(
        //         tasksData.data,
        //         DataVariant.tasks
        //     );

        //     databaseApi.updateData<ITasksData>(tasksData);
        // }
    };

export const deleteTask =
    (task: ITask) => (dispatch: AppDispatch, getState: AppGetState) => {
        const user = getState().userReducer.user;
        // const { tasks } = getState().tasksReducer;

        const updatedTasks = tasks.filter(item => {
            if (item.id !== task.id) {
                return item;
            }
        });

        // dispatch(setTasks(updatedTasks));
        dispatch(setActiveTask({} as ITask));

        // if (user) {
        //     const tasksData: IUpdateData<ITasksData> = {
        //         uid: user.uid,
        //         data: { tasks: updatedTasks },
        //     };

        //     localStorageApi.setLocalData<ITasksData>(
        //         tasksData.data,
        //         DataVariant.tasks
        //     );

        //     databaseApi.updateData<ITasksData>(tasksData);
        // }
    };

export const applyTasksData =
    (tasksData: ITasksData) =>
    (dispatch: AppDispatch, getState: AppGetState) => {
        const { currentProject } = getState().projectsReducer;

        console.log(tasksData);

        dispatch(setTasks(tasksData));
    };
