import { ITask } from "../../../models/ITask";
import { AppDispatch } from "../../store";
import { tasksSlice } from "./tasksSlice";
import { IFormVariant } from "../../../models/IForm";

export type ITaskActionCreator = (
    task: ITask
) => (dispatch: AppDispatch) => void;

export const createNewTask: ITaskActionCreator =
    task => (dispatch: AppDispatch) => {
        try {
            // dispatch(tasksSlice.actions.setIsLoading());

            dispatch(tasksSlice.actions.pushNewTask(task));

            dispatch(tasksSlice.actions.setCurrentTask(task));
        } catch (error) {
            dispatch(tasksSlice.actions.setError(error.message));
        }
    };

export const editTask: ITaskActionCreator = task => (dispatch: AppDispatch) => {
    try {
        // dispatch(tasksSlice.actions.setIsLoading());

        dispatch(tasksSlice.actions.editCurrentTask(task));
    } catch (error) {
        dispatch(tasksSlice.actions.setError(error.message));
    }
};

export const deleteTask: ITaskActionCreator =
    task => (dispatch: AppDispatch) => {
        try {
            dispatch(tasksSlice.actions.deleteCurrentTask());

            if (task) {
                dispatch(tasksSlice.actions.setCurrentTask(task));
            }
        } catch (error) {
            dispatch(tasksSlice.actions.setError(error.message));
        }
    };

export type ITaskFormActionCreator = (
    isFormOpened: boolean,
    formState: IFormVariant
) => (dispatch: AppDispatch) => void;

export const openForm: ITaskFormActionCreator =
    (isFormOpened, formState) => (dispatch: AppDispatch) => {
        if (isFormOpened) {
            dispatch(tasksSlice.actions.setIsFormOpened(isFormOpened));

            dispatch(tasksSlice.actions.setFormState(formState));
        } else {
            dispatch(tasksSlice.actions.setIsFormOpened(isFormOpened));

            dispatch(tasksSlice.actions.setFormState(IFormVariant.initial));
        }
    };
