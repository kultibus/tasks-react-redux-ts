import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Header } from "./components/header/Header";
import styles from "./App.module.scss";
import { useAppSelector } from "./hooks/redux";
import { RouteNames } from "./routes";
import { Layout } from "./components/layout/Layout";
import { LoginPage } from "./pages/LoginPage";

// export const App: FC = () => {
//     const { isAuth } = useAppSelector(state => state.authReducer);

//     // const dispatch = useAppDispatch();

//     // const { users, isLoading, error } = useAppSelector(
//     //     state => state.userReducer
//     // );

//     // useEffect(() => {
//     //     dispatch(fetchUsers());
//     // }, []);

//     return (
//         <main className={styles.app}>
//             <Header />
//             <Outlet />
//         </main>
//     );
// };

export const App: FC = () => {
    const { isAuth } = useAppSelector(state => state.authReducer);

    if (!isAuth) {
        return <Navigate to={RouteNames.login} replace />;
    }

    return <Layout />;
};
