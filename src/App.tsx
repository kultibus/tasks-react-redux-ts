import isEqual from "lodash.isequal";
import { FC, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { LocalDataVariant, databaseApi, localStorageApi } from "./api/api";
import { AppLayout } from "./components/app-layout/AppLayout";
import { AppWrapper } from "./components/app-wrapper/AppWrapper";
import { Header } from "./components/header/Header";
import { MainCnt } from "./components/main-cnt/MainCnt";
import { MainLoader } from "./components/main-loader/MainLoader";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { applyProjectsData } from "./store/slices/projects-slice/projectsActionCreators";
import { applyTasksData } from "./store/slices/tasks-slice/tasksActionCreators";
import { checkUserAuth } from "./store/slices/user-slice/userActionCreators";
import { IProjectsData, IResponseData, ITasksData } from "./types/types";
import { setProjectsIsLoading } from "./store/slices/projects-slice/projectsSlice";
import { setTasksIsLoading } from "./store/slices/tasks-slice/tasksSlice";

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

        const localProjectsData = localStorageApi.getLocalData<IProjectsData>(
            LocalDataVariant.projects
        );

        if (!localProjectsData) {
            dispatch(setProjectsIsLoading(true));
        } else {
            dispatch(applyProjectsData(localProjectsData));
        }

        const localTasksData = localStorageApi.getLocalData<ITasksData>(
            LocalDataVariant.tasks
        );


        if (!localTasksData) {
            // dispatch(setTasksIsLoading(true));
        } else {
            dispatch(applyTasksData(localTasksData));
        }
    }, [dispatch]);

    useEffect(() => {
        if (!uid) return;

        databaseApi.getData(user.uid).then(response => {
            if (!response || typeof response === "string") {
                dispatch(setProjectsIsLoading(false));
                return;
            }

            const { currentProject, projects } = response as IResponseData;

            const localProjectsData =
                localStorageApi.getLocalData<IProjectsData>(
                    LocalDataVariant.projects
                );

            const dbProjectsData = { currentProject, projects };

            if (!isEqual(dbProjectsData, localProjectsData)) {
                localStorageApi.setLocalData(
                    dbProjectsData,
                    LocalDataVariant.projects
                );
                dispatch(applyProjectsData(dbProjectsData));
            }

            // const dbTasksData = { tasks };

            // const localTasksData = localStorageApi.getLocalData<ITasksData>(
            //     LocalDataVariant.tasks
            // );

            // if (!isEqual(dbTasksData, localTasksData)) {
            //     localStorageApi.setLocalData(
            //         dbTasksData,
            //         LocalDataVariant.tasks
            //     );
            //     dispatch(applyTasksData(dbTasksData));
            // }
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



