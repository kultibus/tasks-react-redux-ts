import { IProject } from "../../../models/IProject";
import { AppDispatch } from "../../store";
import { projectsSlice } from "./projectsSlice";

const { createNew, setCurrent, editCurrent, deleteCurrent } =
    projectsSlice.actions;

export const createNewProject =
    (project: IProject) => (dispatch: AppDispatch) => {
        dispatch(createNew(project));

        dispatch(setCurrent(project));
    };

export const editCurrentProject =
    (project: IProject) => (dispatch: AppDispatch) => {
        dispatch(editCurrent(project));
    };

export const deleteCurrentProject =
    (project: IProject) => (dispatch: AppDispatch) => {
        dispatch(deleteCurrent());

        if (project) {
            dispatch(setCurrent(project));
        }
    };

export const setCurrentProject =
    (project: IProject) => (dispatch: AppDispatch) => {
        dispatch(setCurrent(project));
    };
