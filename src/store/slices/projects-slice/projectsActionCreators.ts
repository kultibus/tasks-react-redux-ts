import { onAuthStateChanged } from "firebase/auth";
import { onValue, push, ref, remove, set, update } from "firebase/database";
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

        const projectsListRef = ref(database, `${auth.currentUser.uid}`);
        const currentProjectRef = ref(
            database,
            `${auth.currentUser.uid}/currentProject`
        );

        const newProjectRef = push(projectsListRef);

        set(newProjectRef, project);
        set(currentProjectRef, project);
    };

export const editCurrentProject =
    (project: IProject) => (dispatch: AppDispatch) => {
        dispatch(editCurrent(project));

        dispatch(setCurrent(project));

        const projectsListRef = ref(database, `${auth.currentUser.uid}`);

        onValue(projectsListRef, snapshot => {
            snapshot.forEach(childSnapshot => {
                if (childSnapshot.val().id === project.id) {
                    update(
                        ref(
                            database,
                            `${auth.currentUser.uid}/${childSnapshot.key}`
                        ),
                        project
                    );
                }
            });
        });

        const currentProjectRef = ref(
            database,
            `${auth.currentUser.uid}/currentProject`
        );

        update(currentProjectRef, project);
    };

export const deleteCurrentProject =
    (project: IProject) => (dispatch: AppDispatch) => {
        dispatch(deleteCurrent(project));

        const projectsListRef = ref(database, `${auth.currentUser.uid}`);

        onValue(projectsListRef, snapshot => {
            snapshot.forEach(childSnapshot => {
                if (childSnapshot.val().id === project.id) {
                    remove(
                        ref(
                            database,
                            `${auth.currentUser.uid}/${childSnapshot.key}`
                        )
                    );
                }
            });
        });
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
    dispatch(setIsLoading());

    onAuthStateChanged(auth, user => {
        if (user) {
            onValue(ref(database, `${user.uid}`), snapshot => {
                if (snapshot.exists()) {
                    const projectsArr: IProject[] = [];

                    snapshot.forEach(childSnapshot => {
                        if (childSnapshot.key !== "currentProject") {
                            projectsArr.push(childSnapshot.val());
                        } else {
                            dispatch(setCurrentProject(childSnapshot.val()));
                        }
                    });

                    dispatch(fetchProjects(projectsArr));
                }
            });
        }
    });
};
