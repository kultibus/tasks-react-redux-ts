import { FC } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "../../assets/icons/delete.svg";
import EditIcon from "../../assets/icons/edit.svg";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { RouteNames } from "../../router";
import { openForm } from "../../store/slices/projects-slice/actionCreators";
import { IFormState } from "../../store/slices/projects-slice/projectsSlice";
import { AppBtn, AppBtnVariant } from "../UI/app-btn/AppBtn";
import styles from "./TopBar.module.scss";

interface TopBarProps {}

export const TopBar: FC<TopBarProps> = () => {
    const { projects, isFormOpened, formState } = useAppSelector(
        state => state.projectsReducer
    );

    const navigate = useNavigate();

    const currentProject = projects.find(project => project.current);

    const dispatch = useAppDispatch();

    const handleDelBtn = () => {
        dispatch(openForm(true, IFormState.delete));

        navigate(
            `/${RouteNames.projects}/${currentProject.id}/${RouteNames.deleteProject}`
        );
    };

    return (
        <header className={styles.topBar}>
            <div className={styles.topBarBtns}>
                <AppBtn
                    onClick={handleDelBtn}
                    type="button"
                    variant={AppBtnVariant.iconTopBar}
                >
                    <DeleteIcon />
                </AppBtn>
                <AppBtn type="button" variant={AppBtnVariant.iconTopBar}>
                    <EditIcon />
                </AppBtn>
            </div>
            <h2 className={styles.title}>
                <span>
                    {isFormOpened
                        ? `${formState}\u00A0`
                        : "Project name:\u00A0"}
                </span>
                <span>
                    {!isFormOpened
                        ? currentProject.name
                        : formState !== IFormState.add
                        ? `"${currentProject.name}"\u00A0`
                        : ""}
                </span>
                <span>
                    {!isFormOpened
                        ? ""
                        : formState !== IFormState.add
                        ? "?"
                        : ""}
                </span>
            </h2>
            <AppBtn
                onClick={() => console.log(projects)}
                variant={AppBtnVariant.form}
            >
                Add task
            </AppBtn>
        </header>
    );
};
