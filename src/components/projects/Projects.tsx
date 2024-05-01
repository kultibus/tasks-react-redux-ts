import { FC } from "react";
import { Outlet } from "react-router-dom";
import { SideBar } from "../side-bar/SideBar";
import { TopBar } from "../top-bar/TopBar";
import styles from "./Projects.module.scss";

export const Projects: FC = () => {
    return (
        <div className={styles.projects}>
            <div className={styles.topBar}>
                <TopBar />
            </div>

            <div className={styles.sideBar}>
                <SideBar />
            </div>

            <div className={styles.content}>
                <Outlet />
            </div>
        </div>
    );
};
