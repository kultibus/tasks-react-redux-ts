import { FC, useEffect } from "react";
import { Outlet } from "react-router-dom";
import styles from "./App.module.scss";
import { Header } from "./components/header/Header";
import { useAppDispatch } from "./hooks/redux";
import { IUser } from "./models/IUser";
import { authSlice } from "./store/slices/authSlice/authSlice";
import { MainCnt } from "./components/main-cnt/MainCnt";

export const App: FC = () => {
    const dispatch = useAppDispatch();

    const { setAuth, setUser } = authSlice.actions;

    useEffect(() => {
        if (localStorage.getItem("auth")) {
            dispatch(setAuth(true));
            dispatch(
                setUser({
                    login: localStorage.getItem("displayname" || ""),
                } as IUser)
            );
        }
    }, []);

    return (
        <div className={styles.app}>
            <Header />
            <Outlet />
        </div>
    );
};
