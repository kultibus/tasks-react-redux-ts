import { FC, useMemo } from "react";
import { useAppSelector } from "../../hooks/redux";
import { BtnVariant, Button } from "../UI/buttons/Button";
import styles from "./SideBar.module.scss";
import { List, ListVariant } from "../list/List";
import { NavLink } from "react-router-dom";
import { LinkChild, LinkChildVariant } from "../UI/link-child/LinkChild";

interface SideBarProps {}

export const SideBar: FC<SideBarProps> = () => {
    const { isOpened: isFormOpened } = useAppSelector(
        state => state.projectFormReducer
    );

    const { projects } = useAppSelector(state => state.projectsReducer);

    return (
        <aside className={styles.sideBar}>
            <Button variant={BtnVariant.form}>Add Project</Button>
            <div className={styles.bottom}>
                <h2 className={styles.title}>Projects:</h2>
                <nav className={styles.links}>
                    <List
                        items={projects}
                        variant={ListVariant.sideLinks}
                        renderItem={project => (
                            <NavLink key={project.id} to={"/"}>
                                {({ isActive }) => (
                                    <LinkChild
                                        variant={
                                            isActive
                                                ? LinkChildVariant.active
                                                : LinkChildVariant.link
                                        }
                                    >
                                        {project.name}
                                    </LinkChild>
                                )}
                            </NavLink>
                        )}
                    />
                </nav>
            </div>
        </aside>
    );
};
