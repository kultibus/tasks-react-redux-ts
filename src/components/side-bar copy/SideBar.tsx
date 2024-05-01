import { FC, MouseEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { AppBtn, AppBtnVariant } from "../UI/app-btn/AppBtn";
import { List, ListVariant } from "../list/List";
import { SideLinks } from "../side-links/SideLinks";
import styles from "../side-bar copy/SideBar.module.scss";
import {
    IFormState,
    projectsSlice,
} from "../../store/slices/projects-slice/projectsSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { RouteNames } from "../../router";
import { openForm } from "../../store/slices/projects-slice/projectsActionCreators";

interface SideBarProps {}

export const SideBar: FC<SideBarProps> = () => {
    const { projects, isFormOpened } = useAppSelector(
        state => state.projectsReducer
    );

    const { setCurrentProject, setIsFormOpened } = projectsSlice.actions;

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const linkClick = (e: MouseEvent<HTMLAnchorElement>) => {
        const projectId = e.currentTarget.dataset.projectId;

        dispatch(
            setCurrentProject(
                projects.find(project => project.id === projectId)
            )
        );
        dispatch(openForm(false, IFormState.initial));
    };

    const btnClick = () => {
        // dispatch(setIsFormOpened(true));

        dispatch(openForm(true, IFormState.addProject));

        navigate(`/${RouteNames.projects}/${RouteNames.addProject}`);
    };

    return (
        <aside className={styles.sideBar}>
            <AppBtn
                onClick={btnClick}
                variant={
                    isFormOpened
                        ? AppBtnVariant.formDisabled
                        : AppBtnVariant.form
                }
                disabled={isFormOpened ? true : false}
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
