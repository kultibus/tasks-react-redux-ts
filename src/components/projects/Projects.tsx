import { FC } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import DeleteIcon from "../../assets/icons/delete.svg";
import EditIcon from "../../assets/icons/edit.svg";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { RouteNames } from "../../router";
import { openForm } from "../../store/slices/projects-slice/actionCreators";
import { IFormState } from "../../store/slices/projects-slice/projectsSlice";
import { AppBtn, AppBtnVariant } from "../UI/app-btn/AppBtn";
import { SideBar } from "../side-bar/SideBar";
import styles from "./Projects.module.scss";
import { TopBar } from "../top-bar/TopBar";

interface ProjectsProps {}

export const Projects: FC<ProjectsProps> = () => {
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
        <div className={styles.projects}>
            <div className={styles.topBar}>
                <TopBar />
            </div>

            <div className={styles.sideBar}>
                <SideBar />
            </div>

            <div className={styles.content}>
                <Outlet />
            </div>
        </div>
    );
};
