import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../router/routes";
import styles from "./Header.module.scss";
import { useAppSelector } from "../../hooks/redux";

interface HeaderProps {}

export const Header: FC<HeaderProps> = props => {
    const { isAuth } = useAppSelector(state => state.authReducer);

    return (
        <header className={styles.header}>
            <div className={styles.cnt}>
                <h1 className={styles.title}>Tasks manager</h1>

                {isAuth ? (
                    <Link className={styles.login} to={RouteNames.login}>
                        Logout
                    </Link>
                ) : (
                    <Link className={styles.login} to={RouteNames.login}>
                        Login
                    </Link>
                )}
            </div>
        </header>
    );
};
