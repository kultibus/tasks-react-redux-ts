import { FC, createContext, useEffect } from "react";
import { Outlet, useRouteError } from "react-router-dom";
import { AppLayout } from "./components/app-layout/AppLayout";
import { useAppDispatch } from "./hooks/redux";
import { checkUserAuth } from "./store/slices/user-slice/userActionCreators";
import { Header } from "./components/header/Header";
import { MainCnt } from "./components/main-cnt/MainCnt";

// export const App: FC = () => {
//     const error = useRouteError();

//     const dispatch = useAppDispatch();

//     useEffect(() => {
//         dispatch(checkUserAuth());
//     }, []);

//     return <AppLayout error={error} />;
// };

export const AuthContext = createContext(null);

export const App: FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkUserAuth());
    }, []);

    return (
        <AuthContext.Provider value={!!localStorage.getItem("auth")}>
            <AppLayout>
                <Header />
                <MainCnt>
                    <Outlet />
                </MainCnt>
            </AppLayout>
        </AuthContext.Provider>
    );
};
