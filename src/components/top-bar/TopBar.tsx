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
    const { projects } = useAppSelector(state => state.projectsReducer);
    const currentProject = projects.find(project => project.current);

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const handleDelBtn = () => {
        dispatch(setIsFormOpened(true));
        dispatch(setFormVariant(IFormVariant.deleteProject));

        navigate(
            `/${RouteNames.projects}/${currentProject.id}/${RouteNames.deleteProject}`
        );
    };

    const handleEditBtn = () => {
        dispatch(setIsFormOpened(true));
        dispatch(setFormVariant(IFormVariant.editProject));

        navigate(
            `/${RouteNames.projects}/${currentProject.id}/${RouteNames.editProject}`
        );
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
                    {isOpened ? `${variant}\u00A0` : "Project name:\u00A0"}
                </span>
                <span>
                    {!isOpened
                        ? currentProject.name
                        : variant !== IFormVariant.addProject
                        ? `"${currentProject.name}"\u00A0`
                        : ""}
                </span>
                <span>
                    {!isOpened
                        ? ""
                        : variant !== IFormVariant.addProject
                        ? "?"
                        : ""}
                </span>
            </h2>
            <AppBtn
                onClick={() => console.log(projects)}
                variant={AppBtnVariant.form}
                disabled={isOpened ? true : false}
            >
                Add task
            </AppBtn>
        </header>
    );
};
