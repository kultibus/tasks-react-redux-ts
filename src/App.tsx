import { FC, createContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { AppLayout } from "./components/app-layout/AppLayout";
import { Header } from "./components/header/Header";
import { MainCnt } from "./components/main-cnt/MainCnt";
import { useAppDispatch } from "./hooks/redux";
import { checkProjects } from "./store/slices/projects-slice/projectsActionCreators";
import { checkUserAuth } from "./store/slices/user-slice/userActionCreators";
import { auth } from "./firebase";

export const AuthContext = createContext(null);

export const App: FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkUserAuth());

        dispatch(checkProjects());
    }, []);


    return (
        <AppLayout>
            <Header />
            <MainCnt>
                <Outlet />
            </MainCnt>
        </AppLayout>
    );
};
