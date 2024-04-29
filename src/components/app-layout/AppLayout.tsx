import { FC, ReactNode } from "react";
import styles from "./AppLayout.module.scss";
import { Outlet, RouterProvider, useRouteError } from "react-router-dom";
import { Header } from "../header/Header";
import { NotFound } from "../not-found/NotFound";
import { MainCnt } from "../main-cnt/MainCnt";

interface AppLayoutProps {}

export const AppLayout: FC<AppLayoutProps> = () => {
    const error = useRouteError();

    const message = (error as { data?: string })?.data;
    const status = (error as { status?: string })?.status;

    if (error) {
        return (
            <div className={styles.cnt}>
                <Header />
                <MainCnt>
                    <NotFound message={message} status={status} />
                </MainCnt>
            </div>
        );
    }

    return (
        <div className={styles.cnt}>
            <Header />
            <MainCnt>
                <Outlet />
            </MainCnt>
        </div>
    );
};
