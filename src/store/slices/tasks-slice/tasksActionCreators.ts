import { IBoardVariant } from "../../../components/boards/Boards";
import { ITask } from "../../../types/models/ITask";
import { DataVariant, IUpdateTasksAction } from "../../../types/types";
import { updateDatabase, updateLocalStorage } from "../../../utils/updateData";
import { AppDispatch, AppGetState } from "../../store";
import { setTasks } from "./tasksSlice";

export const createTask =
    (newTask: ITask) => (dispatch: AppDispatch, getState: AppGetState) => {
        const user = getState().userReducer.user;

        const { tasks } = getState().tasksReducer;

        const updatedTasks = [...tasks, newTask];

        dispatch(setTasks(updatedTasks));
    };

export const deleteTask =
    (task: ITask) => (dispatch: AppDispatch, getState: AppGetState) => {
        const user = getState().userReducer.user;
        const { tasks } = getState().tasksReducer;

        const updatedTasks = tasks
            .filter(t => t.id !== task.id)
            .map(t => ({ ...t, isActive: false }));

        dispatch(setTasks(updatedTasks));

        // updateDatabase(user, updatedTasks, DataVariant.tasks);

        updateLocalStorage<ITask[]>(updatedTasks, DataVariant.tasks);
    };

export const updateTasks =
    (task: ITask) => (dispatch: AppDispatch, getState: AppGetState) => {
        const user = getState().userReducer.user;

        const { tasks } = getState().tasksReducer;

        const updatedTasks = tasks.map(t => {
            if (t.id === task.id) {
                return { ...task, isActive: false };
            }
            return { ...t, isActive: false };
        });

        dispatch(setTasks(updatedTasks));

        // updateDatabase(user, updatedTasks, DataVariant.tasks);

        updateLocalStorage<ITask[]>(updatedTasks, DataVariant.tasks);
    };

export const updateActiveTask =
    (task: ITask) => (dispatch: AppDispatch, getState: AppGetState) => {
        const user = getState().userReducer.user;

        const { tasks } = getState().tasksReducer;

        const updatedTasks = task
            ? tasks.map(t => {
                  if (t.id === task.id) {
                      return { ...task, isActive: true };
                  }
                  return { ...t, isActive: false };
              })
            : tasks.map(t => ({ ...t, isActive: false }));

        dispatch(setTasks(updatedTasks));

        // updateDatabase(user, updatedTasks, DataVariant.tasks);

        updateLocalStorage<ITask[]>(updatedTasks, DataVariant.tasks);
    };

export const applyTasks =
    (tasks: ITask[]) => (dispatch: AppDispatch, getState: AppGetState) => {
        dispatch(setTasks(tasks));
    };
