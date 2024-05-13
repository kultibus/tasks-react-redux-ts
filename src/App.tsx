import { FC, createContext, useEffect } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import { AppLayout } from "./components/app-layout/AppLayout";
import { Header } from "./components/header/Header";
import { MainCnt } from "./components/main-cnt/MainCnt";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { checkUserAuth } from "./store/slices/user-slice/userActionCreators";
import { checkProjects } from "./store/slices/projects-slice/projectsActionCreators";
import { MainLoader } from "./components/main-loader/MainLoader";

export const AuthContext = createContext(null);

export const App: FC = () => {
    const { isLoading } = useAppSelector(state => state.projectsReducer);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkUserAuth());

        // dispatch(checkProjects());
    }, []);

    return (
        <AppLayout>
            <Header />
            <MainCnt>{isLoading ? <MainLoader /> : <Outlet />}</MainCnt>
        </AppLayout>
    );
};
