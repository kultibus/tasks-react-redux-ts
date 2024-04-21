import { FC } from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { RouteNames } from "../../router";
import styles from "./Header.module.scss";

interface HeaderProps {}

export const Header: FC<HeaderProps> = props => {
    const { isAuth } = useAppSelector(state => state.authReducer);

    return (
        <header className={styles.header}>
            <div className={styles.cnt}>
                <h1 className={styles.title}>Tasks manager</h1>

                {isAuth ? (
                    <div className={styles.right}>
                        <div className={styles.hi}>Hi, User!</div>
                        <div className={styles.link}>Sign out</div>
                    </div>
                ) : (
                    <div className={styles.right}>
                        <NavLink
                            to={RouteNames.login}
                            className={({ isActive }) =>
                                isActive
                                    ? `${styles.active} ${styles.link}`
                                    : styles.link
                            }
                        >
                            {RouteNames.login}
                        </NavLink>
                        <NavLink
                            to={RouteNames.register}
                            className={({ isActive }) =>
                                isActive
                                    ? `${styles.active} ${styles.link}`
                                    : styles.link
                            }
                        >
                            {RouteNames.register}
                        </NavLink>
                    </div>
                )}
            </div>
        </header>
    );
};
