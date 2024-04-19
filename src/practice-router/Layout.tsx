import { FC, useState } from "react";
import styles from "./AppPractice.module.scss";
import {
    Link,
    Outlet,
    NavLink,
    useMatch,
    Routes,
    Route,
} from "react-router-dom";

export const Layout: FC = () => {
    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <NavLink
                    className={({ isActive }) =>
                        isActive ? styles.acitveLink : ""
                    }
                    to="/"
                >
                    Home
                </NavLink>
                <NavLink
                    className={({ isActive }) =>
                        isActive ? styles.acitveLink : ""
                    }
                    to="/about"
                >
                    About
                </NavLink>
                <NavLink
                    className={({ isActive }) =>
                        isActive ? styles.acitveLink : ""
                    }
                    to="/blog"
                >
                    Blog
                </NavLink>
            </header>
            <Outlet />
        </div>
    );
};
