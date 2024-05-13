import { FC } from "react";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { FormProject } from "../UI/form-project/FormProject";
import { SideBar } from "../side-bar/SideBar";
import { TopBar } from "../top-bar/TopBar";
import styles from "./ProjectLayout.module.scss";

export const ProjectLayout: FC = () => {
    const { projects } = useAppSelector(state => state.projectsReducer);

    return (
        <div className={styles.projects}>
            <div className={styles.topBar}>
                <TopBar />
            </div>

            <div className={styles.sideBar}>
                <SideBar />
            </div>

            <div className={styles.content}>
                {!projects.length ? <FormProject /> : <Outlet />}
            </div>
        </div>
    );
};
