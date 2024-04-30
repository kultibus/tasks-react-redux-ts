import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { AppBtn, AppBtnVariant } from "../UI/app-btn/AppBtn";
import { List, ListVariant } from "../list/List";
import { SideLinks } from "../side-links/SideLinks";
import styles from "./SideBar.module.scss";
import { projectsSlice } from "../../store/slices/projects-slice/projectsSlice";

interface SideBarProps {}

export const SideBar: FC<SideBarProps> = () => {
    const { isOpened: isFormOpened } = useAppSelector(
        state => state.projectFormReducer
    );

    const { projects } = useAppSelector(state => state.projectsReducer);

  

    return (
        <aside className={styles.sideBar}>
            <AppBtn variant={AppBtnVariant.form}>Add Project</AppBtn>
            <div className={styles.bottom}>
                <h2 className={styles.title}>Projects list</h2>
                <nav className={styles.links}>
                    <List
                        items={projects}
                        variant={ListVariant.sideLinks}
                        renderItem={project => (
                            <SideLinks project={project} key={project.id} />
                        )}
                    />
                </nav>
            </div>
        </aside>
    );
};
