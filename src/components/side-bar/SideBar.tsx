import { FC, useMemo } from "react";
import { useAppSelector } from "../../hooks/redux";
import styles from "./SideBar.module.scss";
import { List, ListVariant } from "../list/List";
import { NavLink } from "react-router-dom";
import { LinkInner, LinkInnerVariant } from "../link-inner/LinkInner";
import { AppBtn, AppBtnVariant } from "../UI/app-btn/AppBtn";

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
                <h2 className={styles.title}>Projects:</h2>
                <nav className={styles.links}>
                    <List
                        items={projects}
                        variant={ListVariant.sideLinks}
                        renderItem={project => (
                            <li>
                                <NavLink key={project.id} to={"/"}>
                                    {({ isActive }) => (
                                        <LinkInner
                                            variant={
                                                isActive
                                                    ? LinkInnerVariant.sideActive
                                                    : LinkInnerVariant.side
                                            }
                                        >
                                            {project.name}
                                        </LinkInner>
                                    )}
                                </NavLink>
                            </li>
                        )}
                    />
                </nav>
            </div>
        </aside>
    );
};
