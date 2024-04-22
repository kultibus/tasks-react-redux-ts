import { FC, useEffect } from "react";
import { Outlet } from "react-router-dom";
import styles from "./App.module.scss";
import { Header } from "./components/header/Header";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { fetchUsers } from "./store/actionCreators";
import { FormLogin } from "./components/UI/forms/FormLogin";
import { Button } from "./components/UI/buttons/Button";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const App: FC = () => {
    // const dispatch = useAppDispatch();
    // const { users } = useAppSelector(state => state.usersReducer);

    // useEffect(() => {
    //     dispatch(fetchUsers());
    // }, []);

    return (
        <main className={styles.app}>
            <Header />
            <Outlet />
        </main>
    );
};
