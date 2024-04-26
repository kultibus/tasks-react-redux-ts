import { FC, useEffect } from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import { BtnVariant, Button } from "../components/UI/buttons/Button";
import { AppCnt } from "../components/app-cnt/AppCnt";
import { Header } from "../components/header/Header";
import { MainCnt } from "../components/main-cnt/MainCnt";
import { useAppDispatch } from "../hooks/redux";
import { IUser } from "../models/IUser";
import { authSlice } from "../store/slices/authSlice/authSlice";

export const NotFound: FC = () => {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

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

    const error = useRouteError();

    const message = (error as { data?: string })?.data;
    const status = (error as { status?: string })?.status;

    return (
        <AppCnt>
            <Header />
            <MainCnt>
                <div style={{ color: "black" }}>
                    <h1 style={{ fontSize: "5rem", color: "black" }}>
                        {status}
                    </h1>
                    <div style={{ fontSize: "2rem", color: "black" }}>
                        {message}
                    </div>
                </div>
                <Button onClick={() => navigate(-1)} variant={BtnVariant.form}>
                    Back
                </Button>
            </MainCnt>
        </AppCnt>
    );
};
