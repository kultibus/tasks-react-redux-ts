import { FC } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { SideBar } from "../side-bar/SideBar";
import styles from "./Projects.module.scss";
import DeleteIcon from "../../assets/icons/delete.svg";
import EditIcon from "../../assets/icons/edit.svg";
import { AppBtn, AppBtnVariant } from "../UI/app-btn/AppBtn";
import { projectsSlice } from "../../store/slices/projects-slice/projectsSlice";
import { RouteNames } from "../../router";

interface ProjectsProps {}

export const Projects: FC<ProjectsProps> = () => {
    const { projects, isFormOpened, formState } = useAppSelector(
        state => state.projectsReducer
    );

    const navigate = useNavigate();

    const currentProject = projects.find(project => project.current);

    const { setIsFormOpened, setFormState } = projectsSlice.actions;

    // const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const handleDelete = () => {
        dispatch(setIsFormOpened(true));
        dispatch(setFormState("Delete"));
        navigate(`/${RouteNames.projects}/${RouteNames.deleteProject}`);
    };

    return (
        <div className={styles.projects}>
            <header className={styles.topBar}>
                <div className={styles.topBarBtns}>
                    <AppBtn
                        onClick={handleDelete}
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
                        {formState ? `${formState} project` : "Project name:"}
                    </span>
                    <span>
                        {isFormOpened
                            ? `'${currentProject.name}'?`
                            : currentProject.name}
                    </span>
                </h2>
                <AppBtn
                    onClick={() => console.log(projects)}
                    variant={AppBtnVariant.form}
                >
                    Add task
                </AppBtn>
            </header>

            <div className={styles.sideBar}>
                <SideBar />
            </div>

            <div className={styles.content}>
                <Outlet />
            </div>
        </div>
    );
};
