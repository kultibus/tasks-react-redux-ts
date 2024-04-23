import { FC } from "react";
import { Outlet } from "react-router-dom";
import styles from "./App.module.scss";
import { Header } from "./components/header/Header";
import { useAppSelector } from "./hooks/redux";

export const App: FC = () => {
    // const dispatch = useAppDispatch();
    // const { users } = useAppSelector(state => state.usersReducer);

    // useEffect(() => {
    //     dispatch(fetchUsers());
    // }, []);

	// const { user } = useAppSelector(state => state.authReducer);
	// console.log(user)


    return (
        <main className={styles.app}>
            <Header />
            <Outlet />
        </main>
    );
};
