import { IProject } from "../../../models/IProject";
import { AppDispatch } from "../../store";
import { projectsSlice } from "./projectsSlice";
import { IFormState } from "../../../models/IForm";

export type IProjectActionCreator = (
    project: IProject
) => (dispatch: AppDispatch) => void;

export const createNewProject: IProjectActionCreator =
    project => (dispatch: AppDispatch) => {
        try {
            // dispatch(projectsSlice.actions.setIsLoading());

            dispatch(projectsSlice.actions.pushNewProject(project));

            dispatch(projectsSlice.actions.setCurrentProject(project));
        } catch (error) {
            dispatch(projectsSlice.actions.setError(error.message));
        }
    };

export const editProject: IProjectActionCreator =
    project => (dispatch: AppDispatch) => {
        try {
            // dispatch(projectsSlice.actions.setIsLoading());

            dispatch(projectsSlice.actions.editCurrentProject(project));
        } catch (error) {
            dispatch(projectsSlice.actions.setError(error.message));
        }
    };

export const deleteProject: IProjectActionCreator =
    project => (dispatch: AppDispatch) => {
        try {
            dispatch(projectsSlice.actions.deleteCurrentProject());

            if (project) {
                dispatch(projectsSlice.actions.setCurrentProject(project));
            }
        } catch (error) {
            dispatch(projectsSlice.actions.setError(error.message));
        }
    };

export type IProjectFormActionCreator = (
    isFormOpened: boolean,
    formState: IFormState
) => (dispatch: AppDispatch) => void;

export const openForm: IProjectFormActionCreator =
    (isFormOpened, formState) => (dispatch: AppDispatch) => {
        if (isFormOpened) {
            dispatch(projectsSlice.actions.setIsFormOpened(isFormOpened));

            dispatch(projectsSlice.actions.setFormState(formState));
        } else {
            dispatch(projectsSlice.actions.setIsFormOpened(isFormOpened));

            dispatch(projectsSlice.actions.setFormState(IFormState.initial));
        }
    };
