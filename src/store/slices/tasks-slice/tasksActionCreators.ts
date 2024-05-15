import { ITask } from "../../../models/ITask";
import { AppDispatch } from "../../store";
import { tasksSlice } from "./tasksSlice";

const { createNew, setCurrent, updateCurrent, deleteCurrent } =
    tasksSlice.actions;

export const createNewTask = (task: ITask) => (dispatch: AppDispatch) => {
    dispatch(createNew(task));

    dispatch(setCurrent(task));
};

export const updateCurrentTask = (task: ITask) => (dispatch: AppDispatch) => {
    dispatch(updateCurrent(task));
};

export const deleteCurrentTask = (task: ITask) => (dispatch: AppDispatch) => {
    dispatch(deleteCurrent());

    if (task) {
        dispatch(setCurrent(task));
    }
};

export const setCurrentTask = (task: ITask) => (dispatch: AppDispatch) => {
    dispatch(setCurrent(task));
};
