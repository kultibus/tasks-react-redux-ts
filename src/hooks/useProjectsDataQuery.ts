import isEqual from "lodash.isequal";
import { useEffect } from "react";
import { databaseApi, localStorageApi } from "../api/api";
import { applyProjects } from "../store/slices/projects-slice/projectsActionCreators";
import {
    setProjects,
    setProjectsIsLoading,
} from "../store/slices/projects-slice/projectsSlice";
import { applyTasks } from "../store/slices/tasks-slice/tasksActionCreators";
import {
    setTasks,
    setTasksIsLoading,
} from "../store/slices/tasks-slice/tasksSlice";
// import { checkUserAuth } from "../store/slices/user-slice/userActionCreators";
import { IProject } from "../types/models/IProject";
import { ITask } from "../types/models/ITask";
import { IDataVariant } from "../types/types";
import { useAppDispatch, useAppSelector } from "./redux";

import { onValue, ref } from "firebase/database";
import { database } from "../firebase";
import { setUserIsLoading } from "../store/slices/user-slice/userSlice";

export const useDataQuery = () => {
    const { user } = useAppSelector(state => state.userReducer);

    const dispatch = useAppDispatch();

    const uid = user?.uid;

    useEffect(() => {
        if (!uid) return;

		
        const projectsDbUnsubscribe = onValue(
			ref(database, `${uid}/projects`),
			
            snap => {
                if (!snap.exists()) return;

                dispatch(setProjects(snap.val() as IProject[]));
            }
        );

        const tasksDbUnsubscribe = onValue(
            ref(database, `${uid}/tasks`),
            snap => {
                if (!snap.exists()) return;

                dispatch(setTasks(snap.val() as ITask[]));
            }
        );

        return () => {
            projectsDbUnsubscribe();
            tasksDbUnsubscribe();
        };
    }, [dispatch, uid]);

    // useEffect(() => {
    //     dispatch(checkUserAuth());

    //     const localProjects = localStorageApi.getLocalData<IProject[]>(
    //         IDataVariant.projects
    //     );

    //     if (!!localProjects) {
    //         dispatch(applyProjects(localProjects));
    //     } else {
    //         dispatch(setProjectsIsLoading(true));
    //     }

    //     const localTasks = localStorageApi.getLocalData<ITask[]>(
    //         IDataVariant.tasks
    //     );

    //     if (!!localTasks) {
    //         dispatch(applyTasks(localTasks));
    //     } else {
    //         dispatch(setTasksIsLoading(true));
    //     }
    // }, [dispatch]);

    // useEffect(() => {
    //     if (!uid) {
    //         dispatch(setProjectsIsLoading(false));
    //         dispatch(setTasksIsLoading(false));
    //         return;
    //     }

    //     getData<IProject>(IDataVariant.projects);
    //     getData<ITask>(IDataVariant.tasks);

    //     function getData<T>(variant: IDataVariant) {
    //         databaseApi.getData(user.uid, variant).then(response => {
    //             if (!response || typeof response === "string") {
    //                 localStorageApi.setLocalData<T[]>([], variant);

    //                 switch (variant) {
    //                     case IDataVariant.projects:
    //                         dispatch(applyProjects([]));

    //                         break;

    //                     case IDataVariant.tasks:
    //                         dispatch(applyTasks([]));

    //                         break;
    //                 }

    //                 return;
    //             }

    //             const dbData = response as T[];

    //             const localData = localStorageApi.getLocalData<T[]>(variant);

    //             if (!isEqual(dbData, localData)) {
    //                 localStorageApi.setLocalData<T[]>(dbData, variant);

    //                 switch (variant) {
    //                     case IDataVariant.projects:
    //                         dispatch(applyProjects(dbData as IProject[]));

    //                         break;

    //                     case IDataVariant.tasks:
    //                         dispatch(applyTasks(dbData as ITask[]));

    //                         break;
    //                 }
    //             }
    //         });
    //     }
    // }, [uid, dispatch]);
};
