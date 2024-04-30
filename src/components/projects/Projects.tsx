import { FC, useMemo, useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import {
    FormProject,
    FormProjectVariant,
} from "../UI/form-project/FormProject";
import { Boards } from "../boards/Boards";
import { FormContainer } from "../form-container/FormContainer";
import { SideBar } from "../side-bar/SideBar";
import styles from "./Projects.module.scss";
import { useCurrentProject } from "../../hooks/useCurrentProject";

interface ProjectsProps {}

export const Projects: FC<ProjectsProps> = () => {
    const { isOpened: isFormOpened } = useAppSelector(
        state => state.projectFormReducer
    );

    const { projects } = useAppSelector(state => state.projectsReducer);

    const currentProject = useCurrentProject(projects);

    const [boards] = useState<string[]>(["Opened", "In process", "Done"]);

    return (
        <div className={styles.projects}>
            <header className={styles.topBar}>
                Project name: {currentProject.name}
            </header>

            <div className={styles.sideBar}>
                <SideBar />
            </div>

            <div className={styles.content}>
                {isFormOpened ? (
                    <FormContainer>
                        <FormProject
                            variant={FormProjectVariant.createProject}
                        />
                    </FormContainer>
                ) : (
                    <Boards />
                )}
            </div>
        </div>
    );
};
