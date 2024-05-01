import { FC } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "../../assets/icons/delete.svg";
import EditIcon from "../../assets/icons/edit.svg";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { RouteNames } from "../../router";
import { openForm } from "../../store/slices/projects-slice/projectsActionCreators";
import { IFormState } from "../../models/IForm";
import { AppBtn, AppBtnVariant } from "../UI/app-btn/AppBtn";
import styles from "./TopBar.module.scss";

interface TopBarProps {}

export const TopBar: FC<TopBarProps> = () => {
    const { projects, form } = useAppSelector(state => state.projectsReducer);

    const navigate = useNavigate();

    const currentProject = projects.find(project => project.current);

    const dispatch = useAppDispatch();

    const handleDelBtn = () => {
        dispatch(openForm(true, IFormState.deleteProject));

        navigate(
            `/${RouteNames.projects}/${currentProject.id}/${RouteNames.deleteProject}`
        );
    };

    const handleEditBtn = () => {
        dispatch(openForm(true, IFormState.editProject));

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
                    disabled={form.isOpened ? true : false}
                >
                    <DeleteIcon />
                </AppBtn>
                <AppBtn
                    onClick={handleEditBtn}
                    disabled={form.isOpened ? true : false}
                    type="button"
                    variant={AppBtnVariant.iconTopBar}
                >
                    <EditIcon />
                </AppBtn>
            </div>
            <h2 className={styles.title}>
                <span>
                    {form.isOpened
                        ? `${form.state}\u00A0`
                        : "Project name:\u00A0"}
                </span>
                <span>
                    {!form.isOpened
                        ? currentProject.name
                        : form.state !== IFormState.addProject
                        ? `"${currentProject.name}"\u00A0`
                        : ""}
                </span>
                <span>
                    {!form.isOpened
                        ? ""
                        : form.state !== IFormState.addProject
                        ? "?"
                        : ""}
                </span>
            </h2>
            <AppBtn
                onClick={() => console.log(projects)}
                variant={AppBtnVariant.form}
                disabled={form.isOpened ? true : false}
            >
                Add task
            </AppBtn>
        </header>
    );
};
