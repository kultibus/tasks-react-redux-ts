import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./components/header/Header";
import styles from "./App.module.scss";

export const App: FC = () => {
    

    // const dispatch = useAppDispatch();

    // const { users, isLoading, error } = useAppSelector(
    //     state => state.userReducer
    // );

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
