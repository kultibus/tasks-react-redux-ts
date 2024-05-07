import { onAuthStateChanged } from "firebase/auth";
import {
	onValue,
	ref
} from "firebase/database";
import { auth, database } from "../../../firebase";
import { IProject } from "../../../models/IProject";
import { AppDispatch } from "../../store";
import {
	createNew,
	deleteCurrent,
	editCurrent,
	fetchProjects,
	setCurrent,
	setIsLoading,
} from "./projectsSlice";

export const createNewProject =
    (project: IProject) => (dispatch: AppDispatch) => {
        dispatch(createNew(project));
    };

export const editCurrentProject =
    (project: IProject) => (dispatch: AppDispatch) => {
        dispatch(editCurrent(project));
    };

export const deleteCurrentProject =
    (project: IProject) => (dispatch: AppDispatch) => {
        dispatch(deleteCurrent(project));
    };

export const setCurrentProject =
    (project: IProject) => (dispatch: AppDispatch) => {
        dispatch(setCurrent(project));
    };

export const checkProjects = () => (dispatch: AppDispatch) => {
    dispatch(setIsLoading());

    onAuthStateChanged(auth, user => {
        if (user) {
            onValue(ref(database, `${user.uid}/projects`), snapshot => {
                if (snapshot.exists()) {
                    const projectsArr: IProject[] = [];

                    snapshot.forEach(childSnapshot => {
                        projectsArr.push(childSnapshot.val());

                        // console.log(childSnapshot.val());
                        // if (childSnapshot.val().current) {
                        // }
                    });

                    dispatch(fetchProjects(projectsArr));
                }
            });
        }
    });
};
