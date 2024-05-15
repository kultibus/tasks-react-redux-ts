import { onAuthStateChanged } from "firebase/auth";
import { onValue, ref, remove, update } from "firebase/database";
import { localStorageApi, projectsApi } from "../../../api/api";
import { auth, database } from "../../../firebase";
import { IProject } from "../../../models/IProject";
import { AppDispatch, AppGetState } from "../../store";
import {
    deleteCurrent,
    getProjects,
    setCurrent,
    setIsLoading,
    setProjects,
    updateCurrent,
} from "./projectsSlice";

export interface IProjectsData {
    currentProject: IProject;
    projects: IProject[];
}

export interface IUpdatedData {
    uid: string;
    projectsData: IProjectsData;
}

export const createNewProject =
    (project: IProject) => (dispatch: AppDispatch, getState: AppGetState) => {
        const user = getState().userReducer.user;
        const { projects } = getState().projectsReducer;

        const updatedProjects = [...projects, project];

        dispatch(setProjects(updatedProjects));
        dispatch(setCurrent(project));

        if (user) {
            const userData: IUpdatedData = {
                uid: user.uid,
                projectsData: {
                    currentProject: project,
                    projects: updatedProjects,
                },
            };

            localStorageApi.setProjects(userData.projectsData);

            projectsApi.updateData(userData);
        }
    };

export const updateCurrentProject =
    (project: IProject) => (dispatch: AppDispatch, getState: AppGetState) => {
        const user = getState().userReducer.user;
        const { projects } = getState().projectsReducer;

        const currentProjectIndex = projects.findIndex(
            item => item.id === project.id
        );

        const updatedProjects = [...projects];

        updatedProjects.splice(currentProjectIndex, 1, project);

        dispatch(setProjects(updatedProjects));
        dispatch(setCurrent(project));

        if (user) {
            const userData: IUpdatedData = {
                uid: user.uid,
                projectsData: {
                    currentProject: project,
                    projects: updatedProjects,
                },
            };

            localStorageApi.setProjects(userData.projectsData);

            projectsApi.updateData(userData);
        }
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

export const applyProjectsData =
    (projectsData: IProjectsData) => (dispatch: AppDispatch) => {
        dispatch(setIsLoading(true));

        const { currentProject, projects } = projectsData;

        dispatch(setProjects(projects));
        dispatch(setCurrent(currentProject));
    };

// export const checkProjects = () => (dispatch: AppDispatch) => {
//     dispatch(setIsLoading(true));

//     onAuthStateChanged(auth, user => {
//         if (user) {
//             onValue(
//                 ref(database, `${user.uid}`),
//                 snap => {
//                     if (snap.exists()) {
//                         const currentProjectSnap = snap.child("currentProject");

//                         dispatch(setCurrentProject(currentProjectSnap.val()));

//                         const projectsSnap = snap.child("projects");

//                         const projectsArr: IProject[] = [];

//                         projectsSnap.forEach(child => {
//                             projectsArr.push(child.val());
//                         });

//                         dispatch(getProjects(projectsArr));
//                     }
//                 },
//                 { onlyOnce: true }
//             );
//         }
//     });
// };
