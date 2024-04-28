import { FC, useEffect } from "react";
import { Outlet } from "react-router-dom";
import styles from "./App.module.scss";
import { Header } from "./components/header/Header";
import { useAppDispatch } from "./hooks/redux";
import { IUser } from "./models/IUser";
import { authSlice } from "./store/slices/authSlice/authSlice";
import { MainCnt } from "./components/main-cnt/MainCnt";
import { AppCnt } from "./components/app-cnt/AppCnt";

export const App: FC = () => {
    const dispatch = useAppDispatch();

    const { setAuth, setUser } = authSlice.actions;

    useEffect(() => {
        if (localStorage.getItem("auth")) {
            dispatch(setAuth(true));
            dispatch(
                setUser({
                    displayName: localStorage.getItem("name" || ""),
                    uid: localStorage.getItem("id"),
                } as IUser)
            );
        }
    }, []);

    return (
        <AppCnt>
            <Header />
            <MainCnt>
                <Outlet />
            </MainCnt>
        </AppCnt>
    );
};
