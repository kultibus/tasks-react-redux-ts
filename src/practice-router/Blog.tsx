import { FC, useState } from "react";
import styles from "./AppPractice.module.scss";
import { Link, Outlet } from "react-router-dom";

export const Blog: FC = () => {
    return (
        <div className={styles.page}>
            <h1>Blog page</h1>
        </div>
    );
};
