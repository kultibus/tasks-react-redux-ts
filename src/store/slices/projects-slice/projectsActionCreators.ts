import { onAuthStateChanged } from "firebase/auth";
import {
    onValue,
    push,
    ref,
    remove,
    set,
    update,
    get,
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

        dispatch(setCurrent(project));

        // const projectRef = ref(
        //     database,
        //     `${auth.currentUser.uid}/projects/${project.id}`
        // );
        // const currentProjectRef = ref(
        //     database,
        //     `${auth.currentUser.uid}/currentProject`
        // );

        // set(projectRef, project);
        // set(currentProjectRef, project);
    };

export const editCurrentProject =
    (project: IProject) => (dispatch: AppDispatch) => {
        dispatch(editCurrent(project));

        dispatch(setCurrent(project));

        // const projectRef = ref(
        //     database,
        //     `${auth.currentUser.uid}/projects/${project.id}`
        // );

        // update(projectRef, project);

        // const currentProjectRef = ref(
        //     database,
        //     `${auth.currentUser.uid}/currentProject`
        // );

        // update(currentProjectRef, project);
    };

export const deleteCurrentProject =
    (project: IProject) => (dispatch: AppDispatch) => {
        dispatch(deleteCurrent(project));

        // const projectRef = ref(
        //     database,
        //     `${auth.currentUser.uid}/projects/${project.id}`
        // );

        // remove(projectRef);
    };

export const setCurrentProject =
    (project: IProject) => (dispatch: AppDispatch) => {
        dispatch(setCurrent(project));

        // const currentProjectRef = ref(
        //     database,
        //     `${auth.currentUser.uid}/currentProject`
        // );

        // update(currentProjectRef, project);
    };

export const checkProjects = () => (dispatch: AppDispatch) => {
    dispatch(setIsLoading());

    onAuthStateChanged(auth, async user => {
        if (user) {
            const currentProject = await get(
                ref(database, `${user.uid}/currentProject`)
            );
            if (currentProject.exists()) {
                dispatch(setCurrentProject(currentProject.val()));
            }

            const projects = await get(ref(database, `${user.uid}/projects`));

            if (projects.exists()) {
                const projectsArr: IProject[] = [];

                projects.forEach(project => {
                    projectsArr.push(project.val());
                });

                dispatch(fetchProjects(projectsArr));
            }
        }
    });
};
