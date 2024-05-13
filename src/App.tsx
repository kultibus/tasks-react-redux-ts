import { FC } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import { AuthProvider } from "./AuthProvider";
import { AppLayout } from "./components/app-layout/AppLayout";
import { Header } from "./components/header/Header";
import { MainCnt } from "./components/main-cnt/MainCnt";

export const App: FC = () => {
 

    return (
        <AuthProvider>
            <AppLayout>
                <Header />
                <MainCnt>
                    <Outlet />
                </MainCnt>
            </AppLayout>
        </AuthProvider>
    );
};
