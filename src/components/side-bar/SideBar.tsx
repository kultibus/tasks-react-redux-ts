import { FC, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { IFormVariant } from "../../models/IForm";
import { RouteNames } from "../../router";
import { setCurrentProject } from "../../store/slices/projects-slice/projectsActionCreators";
import { AppBtn, AppBtnVariant } from "../UI/app-btn/AppBtn";
import { List, ListVariant } from "../list/List";
import { SideLinks } from "../side-links/SideLinks";
import styles from "./SideBar.module.scss";
import { toggleForm } from "../../store/slices/form-slice/formActionCreators";

interface SideBarProps {}

export const SideBar: FC<SideBarProps> = () => {
    const { projects } = useAppSelector(state => state.projectsReducer);

    const { isOpened } = useAppSelector(state => state.formProjectsReducer);

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const linkClick = (e: MouseEvent<HTMLAnchorElement>) => {
        const projectId = e.currentTarget.dataset.projectId;

        dispatch(
            setCurrentProject(
                projects.find(project => project.id === projectId)
            )
        );

        dispatch(
            toggleForm({
                isOpened: false,
                variant: IFormVariant.initial,
            })
        );
    };

    const btnClick = () => {
        dispatch(
            toggleForm({
                isOpened: true,
                variant: IFormVariant.addProject,
            })
        );

        navigate(`/${RouteNames.projects}/${RouteNames.addProject}`);
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
                        variant={ListVariant.sideLinks}
                        renderItem={project => (
                            <SideLinks
                                handleClick={linkClick}
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
