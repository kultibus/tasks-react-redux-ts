import { FC, createContext, useEffect, useState } from "react";
import { Outlet, useRouteError } from "react-router-dom";
import { AppLayout } from "./components/app-layout/AppLayout";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { checkUserAuth } from "./store/slices/user-slice/userActionCreators";
import { Header } from "./components/header/Header";
import { MainCnt } from "./components/main-cnt/MainCnt";

export const AuthContext = createContext(null);

export const App: FC = () => {
    const { isAuth } = useAppSelector(state => state.userReducer);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkUserAuth());
    }, []);

    return (
        <AuthContext.Provider value={!!localStorage.getItem("auth") || isAuth}>
            <AppLayout>
                <Header />
                <MainCnt>
                    <Outlet />
                </MainCnt>
            </AppLayout>
        </AuthContext.Provider>
    );
};
