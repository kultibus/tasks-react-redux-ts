import { FC } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "../../assets/icons/delete.svg";
import EditIcon from "../../assets/icons/edit.svg";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { IFormVariant } from "../../models/IForm";
import { RouteNames } from "../../router";
import { AppBtn, AppBtnVariant } from "../UI/app-btn/AppBtn";
import styles from "./TopBar.module.scss";
import {
    setFormVariant,
    setIsFormOpened,
} from "../../store/slices/form-slice/formSlice";

interface TopBarProps {}

export const TopBar: FC<TopBarProps> = () => {
    const { isOpened, variant } = useAppSelector(state => state.formReducer);
    const { currentProject } = useAppSelector(state => state.projectsReducer);

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const handleDelBtn = () => {
        dispatch(setIsFormOpened(true));
        dispatch(setFormVariant(IFormVariant.deleteProject));

        navigate(
            `/${RouteNames.project}/${currentProject.id}/${RouteNames.deleteProject}`
        );
    };

    const handleEditBtn = () => {
        dispatch(setIsFormOpened(true));
        dispatch(setFormVariant(IFormVariant.editProject));

        navigate(
            `/${RouteNames.project}/${currentProject.id}/${RouteNames.editProject}`
        );
    };

    const handleTaskBtn = () => {
        dispatch(setIsFormOpened(true));
        dispatch(setFormVariant(IFormVariant.addTask));

        // navigate(
        //     `/${RouteNames.project}/${currentProject.id}/${RouteNames.editProject}`
        // );
    };

    return (
        <header className={styles.topBar}>
            <div className={styles.topBarBtns}>
                <AppBtn
                    onClick={handleDelBtn}
                    type="button"
                    variant={AppBtnVariant.iconTopBar}
                    disabled={isOpened ? true : false}
                >
                    <DeleteIcon />
                </AppBtn>
                <AppBtn
                    onClick={handleEditBtn}
                    disabled={isOpened ? true : false}
                    type="button"
                    variant={AppBtnVariant.iconTopBar}
                >
                    <EditIcon />
                </AppBtn>
            </div>
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
                        ? currentProject.name
                        : variant !== IFormVariant.addProject
                        ? `"${currentProject.name}"\u00A0`
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
                variant={AppBtnVariant.form}
                disabled={isOpened ? true : false}
            >
                Add task
            </AppBtn>
        </header>
    );
};
