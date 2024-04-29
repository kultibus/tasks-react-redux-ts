import { FC, useMemo, useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import { BtnVariant, Button } from "../UI/buttons/Button";
import {
    FormProject,
    FormProjectVariant,
} from "../UI/forms/form-project/FormProject";
import { FormContainer } from "../form-container/FormContainer";
import { List, ListVariant } from "../list/List";
import styles from "./Projects.module.scss";
import { Board } from "../board/Board";
import { auth } from "../../firebase";

interface ProjectsProps {}

export const Projects: FC<ProjectsProps> = () => {
    const [isFormOpened, setIsFormOpened] = useState<boolean>(false);

    const { projects } = useAppSelector(state => state.projectsReducer);


	const currentProject = useMemo(() => {
		return projects.find(project => project.current)
	}, projects)


    const [boards] = useState<string[]>([
        "Opened",
        "In process",
        "Done",
    ]);

    return (
        <div className={styles.projects}>
            <header className={styles.topBar}>Project name: {currentProject.name}</header>
            <aside className={styles.sideBar}>
                <header>Projects</header>

                <Button variant={BtnVariant.form}>Button</Button>

                <nav>Navigation</nav>
            </aside>
            <div className={styles.content}>
                {isFormOpened ? (
                    <FormContainer>
                        <FormProject
                            variant={FormProjectVariant.createProject}
                        />
                    </FormContainer>
                ) : (
                    <main className={styles.boards}>
                        <List
                            variant={ListVariant.boards}
                            items={boards}
                            renderItem={board => (
                                <Board name={board} key={board} />
                            )}
                        />
                    </main>
                )}
            </div>
        </div>
    );
};
