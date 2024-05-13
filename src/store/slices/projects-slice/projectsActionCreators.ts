import { onAuthStateChanged } from "firebase/auth";
import { get, onValue, ref, remove, set, update } from "firebase/database";
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

        dispatch(setCurrent(project));

        const projectRef = ref(
            database,
            `${auth.currentUser.uid}/projects/${project.id}`
        );
        const currentProjectRef = ref(
            database,
            `${auth.currentUser.uid}/currentProject`
        );

        set(projectRef, project);
        set(currentProjectRef, project);
    };

export const editCurrentProject =
    (project: IProject) => (dispatch: AppDispatch) => {
        dispatch(editCurrent(project));

        dispatch(setCurrent(project));

        const projectRef = ref(
            database,
            `${auth.currentUser.uid}/projects/${project.id}`
        );

        update(projectRef, project);

        const currentProjectRef = ref(
            database,
            `${auth.currentUser.uid}/currentProject`
        );

        update(currentProjectRef, project);
    };

export const deleteCurrentProject =
    (project: IProject) => (dispatch: AppDispatch) => {
        dispatch(deleteCurrent(project));

        const projectRef = ref(
            database,
            `${auth.currentUser.uid}/projects/${project.id}`
        );

        remove(projectRef);
    };

export const setCurrentProject =
    (project: IProject) => (dispatch: AppDispatch) => {
        dispatch(setCurrent(project));

        const currentProjectRef = ref(
            database,
            `${auth.currentUser.uid}/currentProject`
        );

        update(currentProjectRef, project);
    };

export const checkProjects = () => (dispatch: AppDispatch) => {
    dispatch(setIsLoading(true));

    onAuthStateChanged(auth, user => {
        if (user) {
            onValue(
                ref(database, `${user.uid}`),
                snap => {
                    if (snap.exists()) {
                        const currentProjectSnap = snap.child("currentProject");

                        dispatch(setCurrentProject(currentProjectSnap.val()));

                        const projectsSnap = snap.child("projects");

                        const projectsArr: IProject[] = [];

                        projectsSnap.forEach(child => {
                            projectsArr.push(child.val());
                        });

                        dispatch(fetchProjects(projectsArr));
                    }
                },
                { onlyOnce: true }
            );
        }
    });
};
