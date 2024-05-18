import { FC, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { localStorageApi, databaseApi } from "./api/api";
import { AppLayout } from "./components/app-layout/AppLayout";
import { AppWrapper } from "./components/app-wrapper/AppWrapper";
import { Header } from "./components/header/Header";
import { MainCnt } from "./components/main-cnt/MainCnt";
import { MainLoader } from "./components/main-loader/MainLoader";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { applyProjectsData } from "./store/slices/projects-slice/projectsActionCreators";
import { checkUserAuth } from "./store/slices/user-slice/userActionCreators";
import { setProjectsIsLoading } from "./store/slices/projects-slice/projectsSlice";
import isEqual from "lodash.isequal";
import { IProjectsData } from "./types/types";

export const App: FC = () => {
    const { userIsLoading, user } = useAppSelector(state => state.userReducer);
    const { projectsIsLoading } = useAppSelector(
        state => state.projectsReducer
    );

    const dispatch = useAppDispatch();

    const uid = user?.uid;

    useEffect(() => {
        dispatch(checkUserAuth());

        const localProjectsData = localStorageApi.getProjects();

        // if (user && !localProjectsData) {
        //     dispatch(setProjectsIsLoading(true));
        // }

        if (!!localProjectsData) {
            dispatch(applyProjectsData(localProjectsData));
        }
    }, [dispatch]);

    useEffect(() => {
        if (!uid) return;

        databaseApi.getData(user.uid).then(response => {
            if (!response || typeof response === "string") {
                return;
            }

            const dbProjectsData = response as IProjectsData;

            const localProjectsData = localStorageApi.getProjects();

            if (!isEqual(dbProjectsData, localProjectsData)) {
                localStorageApi.setProjects(dbProjectsData);
                dispatch(applyProjectsData(dbProjectsData));
            }
        });
    }, [uid, dispatch]);

    return (
        <AppWrapper>
            {userIsLoading || projectsIsLoading ? (
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
