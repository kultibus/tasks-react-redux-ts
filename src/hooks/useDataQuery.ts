import isEqual from "lodash.isequal";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import { checkUserAuth } from "../store/slices/user-slice/userActionCreators";
import { databaseApi, localStorageApi } from "../api/api";
import { IProject } from "../types/models/IProject";
import { IDataVariant, IThemeVariant } from "../types/types";
import { applyProjects } from "../store/slices/projects-slice/projectsActionCreators";
import { setProjectsIsLoading } from "../store/slices/projects-slice/projectsSlice";
import { ITask } from "../types/models/ITask";
import { applyTasks } from "../store/slices/tasks-slice/tasksActionCreators";
import { setTasksIsLoading } from "../store/slices/tasks-slice/tasksSlice";
import { applyTheme } from "../store/slices/theme-slice/themeActionCreators";

export const useDataQuery = () => {
    const { user } = useAppSelector(state => state.userReducer);

    const { theme } = useAppSelector(state => state.themeReducer);

    const dispatch = useAppDispatch();

    const uid = user?.uid;

    useEffect(() => {
        dispatch(checkUserAuth());

        const localProjects = localStorageApi.getLocalData<IProject[]>(
            IDataVariant.projects
        );

        if (!!localProjects) {
            dispatch(applyProjects(localProjects));
        } else {
            dispatch(setProjectsIsLoading(true));
        }

        const localTasks = localStorageApi.getLocalData<ITask[]>(
            IDataVariant.tasks
        );

        if (!!localTasks) {
            dispatch(applyTasks(localTasks));
        } else {
            dispatch(setTasksIsLoading(true));
        }
    }, [dispatch]);

    useEffect(() => {
        const html = document.querySelector("html");

        const localTheme = localStorageApi.getLocalData<IThemeVariant>(
            IDataVariant.theme
        );

        if (!!localTheme) {
            html.setAttribute("data-theme", localTheme);

            dispatch(applyTheme(localTheme));
            return;
        }

        html.setAttribute("data-theme", theme);
    }, [theme, dispatch]);

    useEffect(() => {
        if (!uid) {
            dispatch(setProjectsIsLoading(false));
            dispatch(setTasksIsLoading(false));
            return;
        }

        getData<IProject>(IDataVariant.projects);
        getData<ITask>(IDataVariant.tasks);

        function getData<T>(variant: IDataVariant) {
            databaseApi.getData(user.uid, variant).then(response => {
                if (!response || typeof response === "string") {
                    localStorageApi.setLocalData<T[]>([], variant);

                    switch (variant) {
                        case IDataVariant.projects:
                            dispatch(applyProjects([]));

                            break;

                        case IDataVariant.tasks:
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
                        case IDataVariant.projects:
                            dispatch(applyProjects(dbData as IProject[]));

                            break;

                        case IDataVariant.tasks:
                            dispatch(applyTasks(dbData as ITask[]));

                            break;
                    }
                }
            });
        }
    }, [uid, dispatch]);
};
