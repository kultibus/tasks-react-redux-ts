import { FC, createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { AppLayout } from "./components/app-layout/AppLayout";
import { Header } from "./components/header/Header";
import { MainCnt } from "./components/main-cnt/MainCnt";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { checkUserAuth } from "./store/slices/user-slice/userActionCreators";

export const AuthContext = createContext(null);

export const App: FC = () => {
    const { isAuth } = useAppSelector(state => state.userReducer);

    const [isLocalAuth, setIsLocalAuth] = useState<boolean>(
        !!localStorage.getItem("auth")
    );

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkUserAuth());

        setIsLocalAuth(!!localStorage.getItem("auth"));
    }, []);

    return (
        <AuthContext.Provider value={isLocalAuth || isAuth}>
            <AppLayout>
                <Header />
                <MainCnt>
                    <Outlet />
                </MainCnt>
            </AppLayout>
        </AuthContext.Provider>
    );
};
