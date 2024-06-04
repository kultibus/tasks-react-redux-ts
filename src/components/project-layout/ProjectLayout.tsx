import { FC } from "react";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { FormProject } from "../UI/form-project/FormProject";
import { SideBar } from "../side-bar/SideBar";
import { TopBar } from "../top-bar/TopBar";
import styles from "./ProjectLayout.module.scss";
import { IFormVariant } from "../../types/models/IForm";

export const ProjectLayout: FC = () => {
    const { isOpened, variant } = useAppSelector(state => state.formReducer);

    return (
        <div className={styles.projects}>
            <div className={styles.topBar}>
                <TopBar />
            </div>

            <div className={styles.sideBar}>
                <SideBar />
            </div>

            <div className={styles.content}>
                {isOpened && variant === IFormVariant.addProject ? (
                    <FormProject />
                ) : (
                    <Outlet />
                )}
            </div>
        </div>
    );
};
