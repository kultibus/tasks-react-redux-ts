import { FC, createContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import styles from "./App.module.scss";
import { Header } from "./components/header/Header";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Button } from "./components/UI/buttons/Button";
import { signout } from "./store/slices/authSlice/actionCreators";

export const App: FC = () => {
    const dispatch = useAppDispatch();

    const {} = useAppSelector(state => state.authReducer);

    // const { users } = useAppSelector(state => state.usersReducer);

    // useEffect(() => {
    //     dispatch(fetchUsers());
    // }, []);
	const auth = getAuth();

	useEffect(() => {
	}, [auth]);
	
    const checkUser = () => {
		onAuthStateChanged(auth, user => {
			if (user) {
				console.log("user in");
			} else {
				console.log("user out");
			}
		});

    };

    const logout = () => {
        dispatch(signout());
    };

    return (
        <main className={styles.app}>
            <Header />
            <Outlet />
            <Button onClick={logout} disabled={false}>
                Sign Out
            </Button>
            <div style={{ height: 6 }}></div>
            <Button onClick={checkUser} disabled={false}>
                test
            </Button>
        </main>
    );
};
