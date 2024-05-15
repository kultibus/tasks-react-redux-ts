import { FC, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { localStorageApi, projectsApi } from "./api/api";
import { AppLayout } from "./components/app-layout/AppLayout";
import { AppWrapper } from "./components/app-wrapper/AppWrapper";
import { Header } from "./components/header/Header";
import { MainCnt } from "./components/main-cnt/MainCnt";
import { MainLoader } from "./components/main-loader/MainLoader";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { applyProjectsData } from "./store/slices/projects-slice/projectsActionCreators";
import { checkUserAuth } from "./store/slices/user-slice/userActionCreators";

export const App: FC = () => {
    const { userIsLoading, user } = useAppSelector(state => state.userReducer);

    const dispatch = useAppDispatch();

    const uid = user?.uid;

    useEffect(() => {
        dispatch(checkUserAuth());

        const localProjectsData = localStorageApi.getProjects();

        if (!!localProjectsData) {
            dispatch(applyProjectsData(localProjectsData));
        }
    }, [dispatch]);

    useEffect(() => {
        if (!uid) return;

        projectsApi.getData(user.uid).then(response => {
            localStorageApi.setProjects(response);

            dispatch(applyProjectsData(response));
        });
    }, [uid, dispatch]);

    return (
        <AppWrapper>
            {userIsLoading ? (
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
