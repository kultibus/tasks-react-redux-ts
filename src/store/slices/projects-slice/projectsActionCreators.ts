import { child, get, ref, set } from "firebase/database";
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
import { auth, database } from "../../../firebase";

export const createNewProject =
    (project: IProject) => (dispatch: AppDispatch) => {
        dispatch(createNew(project));

        dispatch(setCurrent(project));

        set(ref(database, `projects/${auth.currentUser.uid}/${project.id}`), {
            name: project.name,
        });
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

export const checkProjects = (uid) => (dispatch: AppDispatch) => {
    // dispatch(setIsLoading());

    const db = ref(database);

    get(child(db, `projects/${uid}`))
        .then(snapshot => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
            } else {
                console.log("No data available");
            }
        })
        .catch(error => {
            console.error(error);
        });
};
