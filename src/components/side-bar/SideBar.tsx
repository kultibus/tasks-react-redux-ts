import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { projectsDatabaseApi } from "../../api/api";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { RouteNames } from "../../router";
import { setFormVariant, setIsFormOpened } from "../../store/slices/formSlice";
import { IFormVariant } from "../../types/models/IForm";
import { IProject } from "../../types/models/IProject";
import { AppBtn, AppBtnVariant } from "../UI/app-btn/AppBtn";
import { SideLink } from "../UI/side-link/SideLink";
import { List, ListVariant } from "../list/List";
import styles from "./SideBar.module.scss";

interface SideBarProps {}

export const SideBar: FC<SideBarProps> = () => {
    const { projects } = useAppSelector(state => state.projectsReducer);

    const { isOpened } = useAppSelector(state => state.formReducer);

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const { updateActiveKey } = projectsDatabaseApi();

    const handleLinkClick = (project: IProject) => {
        updateActiveKey(project);

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
