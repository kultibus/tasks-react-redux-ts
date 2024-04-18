import { FC, useState } from "react";
import styles from "./AppPractice.module.scss";
import { Link, Outlet } from "react-router-dom";

export const AppPractice: FC = () => {
    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/blog">Blog</Link>
            </header>
            <Outlet />
        </div>
    );
};
