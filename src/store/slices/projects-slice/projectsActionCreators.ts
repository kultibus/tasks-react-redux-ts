import { IProject } from "../../../models/IProject";
import { AppDispatch } from "../../store";
import {
    createNew,
    deleteCurrent,
    editCurrent,
    setCurrent,
} from "./projectsSlice";

export const createNewProject =
    (project: IProject) => (dispatch: AppDispatch) => {
        dispatch(createNew(project));

        dispatch(setCurrent(project));
    };

export const editCurrentProject =
    (project: IProject) => (dispatch: AppDispatch) => {
        dispatch(editCurrent(project));
        dispatch(setCurrent(project));
    };

export const deleteCurrentProject =
    (project: IProject) => (dispatch: AppDispatch) => {
        dispatch(deleteCurrent());
        dispatch(setCurrent({} as IProject));

        if (project) {
            dispatch(setCurrent(project));
        }
    };

export const setCurrentProject =
    (project: IProject) => (dispatch: AppDispatch) => {
        dispatch(setCurrent(project));
    };

export const checkProjectsLenght =
    (project: IProject) => (dispatch: AppDispatch) => {
        dispatch(setCurrent(project));
    };
