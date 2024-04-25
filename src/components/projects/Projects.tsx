import { FC, useState } from "react";
import { MainCnt } from "../main-cnt/MainCnt";
import styles from "./Projects.module.scss";
import { BtnVariant, Button } from "../UI/buttons/Button";
import { List, ListVariant } from "../list/List";
import { Board } from "../board/Board";
import { Task } from "../task/Task";

interface ProjectsProps {}

export const Projects: FC<ProjectsProps> = () => {
    const [boards, setBoards] = useState<string[]>([
        "Opened",
        "In process",
        "Done",
    ]);

    const [tasks, setTasks] = useState<string[]>(["task1", "task2", "task3"]);

    return (
        <MainCnt>
            <div className={styles.projects}>
                <header className={styles.topBar}>header</header>
                <aside className={styles.sideBar}>
                    <header>Projects</header>

                    <Button variant={BtnVariant.form}>Add new project</Button>

                    <nav>navigation</nav>
                </aside>
                <main className={styles.boards}>
                    <List
                        variant={ListVariant.boards}
                        items={boards}
                        renderItem={board => (
                            <Board>
                                <header className={styles.boardHeader}>
                                    {board}
                                </header>
                                <section className={styles.boardSection}>
                                    <List
                                        variant={ListVariant.tasks}
                                        items={tasks}
                                        renderItem={task => <Task>{task}</Task>}
                                    />
                                </section>
                            </Board>
                        )}
                    />
                </main>
            </div>
        </MainCnt>
    );
};
