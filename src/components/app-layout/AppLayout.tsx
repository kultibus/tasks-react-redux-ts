import { FC, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import { authSlice } from "../../store/slices/auth-slice/authSlice";
import { Header } from "../header/Header";
import { MainCnt } from "../main-cnt/MainCnt";
import { NotFound } from "../not-found/NotFound";
import styles from "./AppLayout.module.scss";
import { IUser } from "../../models/IUser";
import { checkAuth } from "../../store/slices/auth-slice/actionCreators";

interface AppLayoutProps {
    error: unknown;
}

export const AppLayout: FC<AppLayoutProps> = ({ error }) => {
    // const dispatch = useAppDispatch();

    // useEffect(() => {
    //     dispatch(checkAuth());
    // }, []);

    const message = (error as { data?: string })?.data;
    const status = (error as { status?: string })?.status;

    return (
        <div className={styles.appCnt}>
            <Header />
            <MainCnt>
                {error ? (
                    <NotFound message={message} status={status} />
                ) : (
                    <Outlet />
                )}
            </MainCnt>
        </div>
    );
};
