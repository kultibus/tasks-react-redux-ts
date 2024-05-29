import { ITask } from "../../../types/models/ITask";
import { IDataVariant } from "../../../types/types";
import { updateDatabase, updateLocalStorage } from "../../../utils/updateData";
import { AppDispatch, AppGetState } from "../../store";
import { setTasks } from "./tasksSlice";

export const createTask =
    (newTask: ITask) => (dispatch: AppDispatch, getState: AppGetState) => {
        const user = getState().userReducer.user;

        const { tasks } = getState().tasksReducer;

        const updatedTasks = [...tasks, newTask];

        dispatch(setTasks(updatedTasks));

        updateDatabase(user, updatedTasks, IDataVariant.tasks);

        updateLocalStorage<ITask[]>(updatedTasks, IDataVariant.tasks);
    };

export const deleteTask =
    (task: ITask) => (dispatch: AppDispatch, getState: AppGetState) => {
        const user = getState().userReducer.user;

        const { tasks } = getState().tasksReducer;

        const updatedTasks = tasks.filter(t => t.id !== task.id);

        dispatch(setTasks(updatedTasks));

        updateDatabase(user, updatedTasks, IDataVariant.tasks);

        updateLocalStorage<ITask[]>(updatedTasks, IDataVariant.tasks);
    };

export const editTask =
    (task: ITask) => (dispatch: AppDispatch, getState: AppGetState) => {
        const user = getState().userReducer.user;

        const { tasks } = getState().tasksReducer;

        const updatedTasks = tasks.map(t => {
            if (t.id === task.id) {
                return task;
            }
            return t;
        });

        dispatch(setTasks(updatedTasks));

        updateDatabase(user, updatedTasks, IDataVariant.tasks);

        updateLocalStorage<ITask[]>(updatedTasks, IDataVariant.tasks);
    };


export const applyTasks = (tasks: ITask[]) => (dispatch: AppDispatch) => {
    dispatch(setTasks(tasks));
};
