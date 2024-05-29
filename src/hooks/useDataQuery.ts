import isEqual from "lodash.isequal";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import { checkUserAuth } from "../store/slices/user-slice/userActionCreators";
import { databaseApi, localStorageApi } from "../api/api";
import { IProject } from "../types/models/IProject";
import { DataVariant } from "../types/types";
import { applyProjects } from "../store/slices/projects-slice/projectsActionCreators";
import { setProjectsIsLoading } from "../store/slices/projects-slice/projectsSlice";
import { ITask } from "../types/models/ITask";
import { applyTasks } from "../store/slices/tasks-slice/tasksActionCreators";
import { setTasksIsLoading } from "../store/slices/tasks-slice/tasksSlice";

export const useDataQuery = () => {
    const { user } = useAppSelector(state => state.userReducer);

    const dispatch = useAppDispatch();

    const uid = user?.uid;

    useEffect(() => {
        dispatch(checkUserAuth());

        const localProjects = localStorageApi.getLocalData<IProject[]>(
            DataVariant.projects
        );

        if (!!localProjects) {
            dispatch(applyProjects(localProjects));
        } else {
            dispatch(setProjectsIsLoading(true));
        }

        const localTasks = localStorageApi.getLocalData<ITask[]>(
            DataVariant.tasks
        );

        if (!!localTasks) {
            dispatch(applyTasks(localTasks));
        } else {
            dispatch(setTasksIsLoading(true));
        }
    }, [dispatch]);

    useEffect(() => {
        if (!uid) {
            dispatch(setProjectsIsLoading(false));
            dispatch(setTasksIsLoading(false));
            return;
        }

        getData<IProject>(DataVariant.projects);
        getData<ITask>(DataVariant.tasks);

        function getData<T>(variant: DataVariant) {
            databaseApi.getData(user.uid, variant).then(response => {
                if (!response || typeof response === "string") {
                    localStorageApi.setLocalData<T[]>([], variant);

                    switch (variant) {
                        case DataVariant.projects:
                            dispatch(applyProjects([]));

                            break;

                        case DataVariant.tasks:
                            dispatch(applyTasks([]));

                            break;
                    }

                    return;
                }

                const dbData = response as T[];

                const localData = localStorageApi.getLocalData<T[]>(variant);

                if (!isEqual(dbData, localData)) {
                    localStorageApi.setLocalData<T[]>(dbData, variant);

                    switch (variant) {
                        case DataVariant.projects:
                            dispatch(applyProjects(dbData as IProject[]));

                            break;

                        case DataVariant.tasks:
                            dispatch(applyTasks(dbData as ITask[]));

                            break;
                    }
                }
            });
        }
    }, [uid, dispatch]);
};
