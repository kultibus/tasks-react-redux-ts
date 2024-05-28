import { IBoardVariant } from "../../../components/boards/Boards";
import { ITask } from "../../../types/models/ITask";
import { IProjectTasks, IUpdateTasksAction } from "../../../types/types";
import { AppDispatch, AppGetState } from "../../store";
import {
    setActiveTask,
    // setDoneTasks,
    // setInProcessTasks,
    // setOpenedTasks,
} from "./tasksSlice";

export const createTask =
    (newTask: ITask) => (dispatch: AppDispatch, getState: AppGetState) => {
        const user = getState().userReducer.user;
        // const { openedTasks, inProcessTasks, doneTasks } =
        //     getState().tasksReducer;
        // const { activeProject } = getState().projectsReducer;

        // const currentData = openedTasks.find(
        //     t => t.projectId === activeProject.id
        // );

        // const updatedCurrentData = currentData
        //     ? {
        //           ...currentData,
        //           tasks: [...currentData.tasks, newTask],
        //       }
        //     : { projectId: activeProject.id, tasks: [newTask] };

        // const updatedOpenedTasks = currentData
        //     ? openedTasks.map(t => {
        //           if (t.projectId === activeProject.id) {
        //               return updatedCurrentData;
        //           }
        //           return t;
        //       })
        //     : [...openedTasks, updatedCurrentData];

        // dispatch(setOpenedTasks(updatedOpenedTasks));

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

export const updateTasks =
    (updatedTask: ITask, updateAction: IUpdateTasksAction) =>
    (dispatch: AppDispatch, getState: AppGetState) => {
        const user = getState().userReducer.user;
        const { openedTasks, inProcessTasks, doneTasks, activeBoard } =
            getState().tasksReducer;
        const { activeProject } = getState().projectsReducer;

        const updateTasks = (data: IProjectTasks[]) => {
            const currentData = data.find(
                t => t.projectId === activeProject.id
            );

            const updatedTasks =
                updateAction === "update"
                    ? currentData.tasks.map(t => {
                          if (t.id === updatedTask.id) {
                              return updatedTask;
                          }
                          return t;
                      })
                    : currentData.tasks.filter(t => t.id !== updatedTask.id);

            const updatedCurrentData = { ...currentData, tasks: updatedTasks };

            return data.map(t => {
                if (t.projectId === activeProject.id) {
                    return updatedCurrentData;
                }
                return t;
            });
        };

        switch (activeBoard) {
            case IBoardVariant.inProcess:
                dispatch(setInProcessTasks(updateTasks(inProcessTasks)));

                break;

            case IBoardVariant.done:
                dispatch(setDoneTasks(updateTasks(doneTasks)));

                break;

            default:
                dispatch(setOpenedTasks(updateTasks(openedTasks)));

                break;
        }

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
    (tasksData: IProjectTasks) =>
    (dispatch: AppDispatch, getState: AppGetState) => {
        const { activeProject } = getState().projectsReducer;

        console.log(tasksData);
    };
