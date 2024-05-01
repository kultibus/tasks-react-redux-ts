import { FC, createContext, useEffect, useState } from "react";
import { useRouteError } from "react-router-dom";
import { AppLayout } from "./components/app-layout/AppLayout";
import { useAppDispatch } from "./hooks/redux";

export const AuthContext = createContext(null);

export const App: FC = () => {
    const error = useRouteError();

    const [isAuth, setIsAuth] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    // useEffect(() => {
    //     setIsAuth(!!localStorage.getItem("auth"));
    // }, []);

    return (
        <AuthContext.Provider value={isAuth}>
            <AppLayout error={error} />
        </AuthContext.Provider>
    );
};
