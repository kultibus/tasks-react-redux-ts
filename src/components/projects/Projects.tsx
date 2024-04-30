import { FC } from "react";
import { useAppSelector } from "../../hooks/redux";
import { useCurrentProject } from "../../hooks/useCurrentProject";
import {
    FormProject,
    FormProjectVariant,
} from "../UI/form-project/FormProject";
import { Boards } from "../boards/Boards";
import { FormContainer } from "../form-container/FormContainer";
import { SideBar } from "../side-bar/SideBar";
import styles from "./Projects.module.scss";

interface ProjectsProps {}

export const Projects: FC<ProjectsProps> = () => {
    const { isFormOpened } = useAppSelector(state => state.projectsReducer);

    const { projects } = useAppSelector(state => state.projectsReducer);

    const currentProject = projects.find(project => project.current);

    return (
        <div className={styles.projects}>
            <header className={styles.topBar}>
                Project name: {isFormOpened ? "" : currentProject.name}
            </header>

            <div className={styles.sideBar}>
                <SideBar />
            </div>

            <div className={styles.content}>
                {isFormOpened ? (
                    <FormContainer>
                        <FormProject
                            variant={FormProjectVariant.new}
                        />
                    </FormContainer>
                ) : (
                    <Boards />
                )}
            </div>
        </div>
    );
};
