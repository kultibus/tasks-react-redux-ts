import { FC, useEffect } from "react";
import { Outlet } from "react-router-dom";
import styles from "./App.module.scss";
import { Header } from "./components/header/Header";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { auth } from "./firebase";
import { authSlice } from "./store/slices/authSlice/authSlice";
import { IUser } from "./models/IUser";

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
        <main className={styles.app}>
            <Header />
            <Outlet />
        </main>
    );
};
