import { FC } from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { RouteNames } from "../../router";
import styles from "./Header.module.scss";
import { Button } from "../UI/buttons/Button";
import { signout } from "../../store/slices/authSlice/actionCreators";

interface HeaderProps {}

export const Header: FC<HeaderProps> = props => {
    const { isAuth, user } = useAppSelector(state => state.authReducer);

    const dispatch = useAppDispatch();

    return (
        <header className={styles.header}>
            <div className={styles.cnt}>
                <h1 className={styles.title}>Tasks manager</h1>

                {isAuth ? (
                    <div className={styles.right}>
                        <div className={styles.hi}>Hi, {user.login}!</div>
                        <Button
                            type="button"
                            onClick={() => dispatch(signout())}
                            className={styles.signout}
                        >
                            Sign out
                        </Button>
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
