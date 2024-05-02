import { FC, createContext, useEffect, useState } from "react";
import { useRouteError } from "react-router-dom";
import { AppLayout } from "./components/app-layout/AppLayout";
import { useAppDispatch } from "./hooks/redux";
import { checkUserAuth } from "./store/slices/user-slice/userActionCreators";
import { auth } from "./firebase";

export const App: FC = () => {
    const error = useRouteError();

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkUserAuth());
    }, []);

    return <AppLayout error={error} />;
};
