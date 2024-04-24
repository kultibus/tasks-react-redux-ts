import { FC } from "react";
import { Outlet } from "react-router-dom";
import styles from "./App.module.scss";
import { Header } from "./components/header/Header";
import { useAppDispatch, useAppSelector } from "./hooks/redux";

export const App: FC = () => {
    // const dispatch = useAppDispatch();

    // const {} = useAppSelector(state => state.authReducer);

    // const { users } = useAppSelector(state => state.usersReducer);

    // useEffect(() => {
    //     dispatch(fetchUsers());
    // }, []);

    return (
        <main className={styles.app}>
            <Header />
            <Outlet />
        </main>
    );
};
