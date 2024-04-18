import { FC, useState } from "react";
import styles from "./AppPractice.module.scss";
import { Link, Outlet } from "react-router-dom";

export const About: FC = () => {
    return (
        <div className={styles.page}>
            <h1>About page</h1>
        </div>
    );
};
