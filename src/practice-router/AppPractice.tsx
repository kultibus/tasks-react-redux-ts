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
import { Layout } from "./Layout";
import { About } from "./About";
import { Blog } from "./Blog";
import { Home } from "./Home";
import { Post } from "./Post";
import { ErrorPage } from "./ErrorPage";
import classNames from "classnames";

export const AppPractice: FC = () => {
    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <NavLink
                    className={({ isActive }) =>
                        isActive
                            ? `${styles.acitveLink} ${styles.link}`
                            : styles.link
                    }
                    to="/"
                >
                    Home
                </NavLink>
                <NavLink
                    className={({ isActive }) =>
                        isActive
                            ? `${styles.acitveLink} ${styles.link}`
                            : styles.link
                    }
                    to="/about"
                >
                    About
                </NavLink>
                <NavLink
                    className={({ isActive }) =>
                        isActive
                            ? `${styles.acitveLink} ${styles.link}`
                            : styles.link
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
