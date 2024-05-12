import { FC, ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { SideBar } from "../side-bar/SideBar";
import { TopBar } from "../top-bar/TopBar";
import styles from "./ProjectLayout.module.scss";
import { useAppSelector } from "../../hooks/redux";
import { IFormVariant } from "../../models/IForm";
import { FormProject } from "../UI/form-project/FormProject";

export const ProjectLayout: FC = () => {
    const { variant } = useAppSelector(state => state.formReducer);
    const { projects } = useAppSelector(state => state.projectsReducer);

    // console.log(variant);

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
