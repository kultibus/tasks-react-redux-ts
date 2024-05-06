import { FC, createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { AppLayout } from "./components/app-layout/AppLayout";
import { Header } from "./components/header/Header";
import { MainCnt } from "./components/main-cnt/MainCnt";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { checkUserAuth } from "./store/slices/user-slice/userActionCreators";
import { checkProjects } from "./store/slices/projects-slice/projectsActionCreators";
import { auth } from "./firebase";

export const AuthContext = createContext(null);

export const App: FC = () => {
    const { user } = useAppSelector(state => state.userReducer);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkUserAuth());
        dispatch(checkProjects(user.uid));
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
