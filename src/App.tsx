import { FC } from "react";
import { Outlet } from "react-router-dom";
import { AppLayout } from "./components/app-layout/AppLayout";
import { AppWrapper } from "./components/app-wrapper/AppWrapper";
import { Header } from "./components/header/Header";
import { MainCnt } from "./components/main-cnt/MainCnt";
import { MainLoader } from "./components/main-loader/MainLoader";
import { useAppSelector } from "./hooks/redux";
import { useDataQuery } from "./hooks/useProjectsDataQuery";
import { useCheckAuth } from "./hooks/useCheckAuth";
import { useProjectsDataQuery } from "./hooks/useDataQuery";

export const App: FC = () => {
    const { userIsLoading } = useAppSelector(state => state.userReducer);
    const { projectsIsLoading } = useAppSelector(
        state => state.projectsReducer
    );
    const { tasksIsLoading } = useAppSelector(state => state.tasksReducer);

    useCheckAuth();

    useProjectsDataQuery();

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
