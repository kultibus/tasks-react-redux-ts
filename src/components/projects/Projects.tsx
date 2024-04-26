import { FC, useState } from "react";
import { BtnVariant, Button } from "../UI/buttons/Button";
import {
    FormProject,
    FormProjectVariant,
} from "../UI/forms/form-project/FormProject";
import { Board } from "../board/Board";
import { FormContainer } from "../form-container/FormContainer";
import { List, ListVariant } from "../list/List";
import styles from "./Projects.module.scss";

interface ProjectsProps {}

export const Projects: FC<ProjectsProps> = () => {
    const [boards, setBoards] = useState<string[]>([
        "Opened",
        "In process",
        "Done",
    ]);

    const test = true;

    return (
        <div className={styles.projects}>
            <header className={styles.topBar}>Top Bar</header>
            <aside className={styles.sideBar}>
                <header>Title</header>

                <Button variant={BtnVariant.form}>Button</Button>

                <nav>Navigation</nav>
            </aside>
            <div className={styles.content}>
                {test ? (
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
                                <Board board={board} key={board} />
                            )}
                        />
                    </main>
                )}
            </div>
        </div>
    );
};
