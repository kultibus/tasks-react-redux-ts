import { FC } from "react";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { SideBar } from "../side-bar/SideBar";
import styles from "./Projects.module.scss";

interface ProjectsProps {}

export const Projects: FC<ProjectsProps> = () => {
    const { isFormOpened } = useAppSelector(state => state.projectsReducer);

    const { projects } = useAppSelector(state => state.projectsReducer);

    const currentProject = projects.find(project => project.current);

    return (
        <div className={styles.projects}>
            <header className={styles.topBar}>
                Project name: {isFormOpened ? "" : currentProject.name}
            </header>

            <div className={styles.sideBar}>
                <SideBar />
            </div>

            <div className={styles.content}>
                <Outlet />
            </div>
        </div>
    );
};
