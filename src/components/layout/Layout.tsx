import { FC } from "react";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.scss";
import { Header } from "../header/Header";

export const Layout: FC = () => {
    return (
        <main className={styles.layout}>
            <Header />
            <Outlet />
        </main>
    );
};
