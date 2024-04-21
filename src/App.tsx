import { FC } from "react";
import { Outlet } from "react-router-dom";
import styles from "./App.module.scss";
import { Header } from "./components/header/Header";

export const App: FC = () => {
    return (
        <main className={styles.app}>
            <Header />
            <Outlet />
        </main>
    );
};
