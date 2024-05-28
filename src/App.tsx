import isEqual from "lodash.isequal";
import { FC, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { databaseApi, localStorageApi } from "./api/api";
import { AppLayout } from "./components/app-layout/AppLayout";
import { AppWrapper } from "./components/app-wrapper/AppWrapper";
import { Header } from "./components/header/Header";
import { MainCnt } from "./components/main-cnt/MainCnt";
import { MainLoader } from "./components/main-loader/MainLoader";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { applyProjects } from "./store/slices/projects-slice/projectsActionCreators";
import { applyTasksData } from "./store/slices/tasks-slice/tasksActionCreators";
import { checkUserAuth } from "./store/slices/user-slice/userActionCreators";
import { DataVariant, IProjectsData } from "./types/types";
import { setProjectsIsLoading } from "./store/slices/projects-slice/projectsSlice";
import { setTasksIsLoading } from "./store/slices/tasks-slice/tasksSlice";
import { IProject } from "./types/models/IProject";

export const App: FC = () => {
    const { userIsLoading, user } = useAppSelector(state => state.userReducer);
    const { projectsIsLoading } = useAppSelector(
        state => state.projectsReducer
    );
    const { tasksIsLoading } = useAppSelector(state => state.tasksReducer);

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

        // const localTasks = localStorageApi.getLocalData<ITasksData>(
        //     DataVariant.tasks
        // );

        // if (!!localTasks) {
        //     dispatch(applyTasksData(localTasks));
        // } else {
        //     dispatch(setTasksIsLoading(true));
        // }
    }, [dispatch]);

    useEffect(() => {
        if (!uid) {
            dispatch(setProjectsIsLoading(false));
            dispatch(setTasksIsLoading(false));
            return;
        }

        databaseApi.getData(user.uid, DataVariant.projects).then(response => {
            if (!response || typeof response === "string") {
                localStorageApi.setLocalData<IProject[]>(
                    [],
                    DataVariant.projects
                );

                dispatch(applyProjects([]));
                return;
            }

            const databaseProjects = response as IProject[];

            const localProjects = localStorageApi.getLocalData<IProject[]>(
                DataVariant.projects
            );

            if (!isEqual(databaseProjects, localProjects)) {
                localStorageApi.setLocalData<IProject[]>(
                    databaseProjects,
                    DataVariant.projects
                );

                dispatch(applyProjects(databaseProjects));
            }
        });
    }, [uid, dispatch]);

    return (
        <AppWrapper>
            {userIsLoading || projectsIsLoading || tasksIsLoading ? (
                <MainLoader />
            ) : (
                <AppLayout>
                    <Header />
                    <MainCnt>
                        <Outlet />
                    </MainCnt>
                </AppLayout>
            )}
        </AppWrapper>
    );
};
