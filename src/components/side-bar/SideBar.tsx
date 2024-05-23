import { FC, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { IFormVariant } from "../../types/models/IForm";
import { RouteNames } from "../../router";
import {
    setFormVariant,
    setIsFormOpened,
} from "../../store/slices/form-slice/formSlice";
import { updateCurrentProject } from "../../store/slices/projects-slice/projectsActionCreators";
import { AppBtn, AppBtnVariant } from "../UI/app-btn/AppBtn";
import { List, ListVariant } from "../list/List";
import { SideLink } from "../UI/side-link/SideLink";
import styles from "./SideBar.module.scss";
import { IProject } from "../../types/models/IProject";

interface SideBarProps {}

export const SideBar: FC<SideBarProps> = () => {
    const { projects } = useAppSelector(state => state.projectsReducer);

    const { isOpened } = useAppSelector(state => state.formReducer);

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const handleLinkClick = (project: IProject) => {
        const projectId = project.id;

        dispatch(
            updateCurrentProject(
                projects.find(project => project.id === projectId)
            )
        );

        dispatch(setIsFormOpened(false));
    };

    const btnClick = () => {
        dispatch(setIsFormOpened(true));
        dispatch(setFormVariant(IFormVariant.addProject));

        navigate(`/${RouteNames.project}/${RouteNames.addProject}`);
    };

    return (
        <aside className={styles.sideBar}>
            <AppBtn
                onClick={btnClick}
                variant={
                    isOpened ? AppBtnVariant.formDisabled : AppBtnVariant.form
                }
                disabled={isOpened ? true : false}
            >
                New project
            </AppBtn>
            <div className={styles.bottom}>
                <h2 className={styles.title}>Projects list</h2>
                <nav className={styles.links}>
                    <List
                        items={projects}
                        variant={ListVariant.SideLink}
                        renderItem={project => (
                            <SideLink
                                handleClick={() => handleLinkClick(project)}
                                project={project}
                                key={project.id}
                            />
                        )}
                    />
                </nav>
            </div>
        </aside>
    );
};
