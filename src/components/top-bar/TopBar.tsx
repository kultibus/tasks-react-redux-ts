import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { RouteNames } from "../../router";
import { setFormVariant, setIsFormOpened } from "../../store/slices/formSlice";
import { IFormVariant } from "../../types/models/IForm";
import { AppBtn, AppBtnVariant } from "../UI/app-btn/AppBtn";
import {
    EditDelBtns,
    EditDelBtnsVariant,
} from "../UI/edit-del-btns/EditDelBtns";
import styles from "./TopBar.module.scss";
import { useProjects } from "../../hooks/useProjects";

interface TopBarProps {}

export const TopBar: FC<TopBarProps> = () => {
    const { isOpened, variant } = useAppSelector(state => state.formReducer);

    const { activeProject } = useProjects();

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const handleDelProject = () => {
        dispatch(setIsFormOpened(true));
        dispatch(setFormVariant(IFormVariant.deleteProject));

        navigate(
            `/${RouteNames.project}/${activeProject.id}/${RouteNames.deleteProject}`
        );
    };

    const handleEditProject = () => {
        dispatch(setIsFormOpened(true));
        dispatch(setFormVariant(IFormVariant.editProject));

        navigate(
            `/${RouteNames.project}/${activeProject.id}/${RouteNames.editProject}`
        );
    };

    const handleTaskBtn = () => {
        dispatch(setIsFormOpened(true));
        dispatch(setFormVariant(IFormVariant.addTask));
    };

    return (
        <header className={styles.topBar}>
            <EditDelBtns
                variant={EditDelBtnsVariant.project}
                handleDelBtn={handleDelProject}
                handleEditBtn={handleEditProject}
            />
            <h2 className={styles.title}>
                <span>
                    {isOpened &&
                    (variant === IFormVariant.addProject ||
                        variant === IFormVariant.editProject ||
                        variant === IFormVariant.deleteProject)
                        ? `${variant}\u00A0`
                        : "Project name:\u00A0"}
                </span>
                <span>
                    {!isOpened ||
                    variant === IFormVariant.addTask ||
                    variant === IFormVariant.editTask ||
                    variant === IFormVariant.deleteTask
                        ? activeProject.name
                        : variant !== IFormVariant.addProject
                        ? `"${activeProject.name}"\u00A0`
                        : ""}
                </span>
                <span>
                    {!isOpened ||
                    variant === IFormVariant.addTask ||
                    variant === IFormVariant.editTask ||
                    variant === IFormVariant.deleteTask
                        ? ""
                        : variant !== IFormVariant.addProject
                        ? "?"
                        : ""}
                </span>
            </h2>
            <AppBtn
                onClick={handleTaskBtn}
                variant={
                    isOpened ? AppBtnVariant.formDisabled : AppBtnVariant.form
                }
                disabled={isOpened ? true : false}
            >
                Add task
            </AppBtn>
        </header>
    );
};
