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
        <div className={styles.projects}>
            <header className={styles.topBar}>Top Bar</header>
            <aside className={styles.sideBar}>
                <header>Title</header>

                <Button variant={BtnVariant.form}>Button</Button>

                <nav>Navigation</nav>
            </aside>
            <main className={styles.boards}>
                <List
                    variant={ListVariant.boards}
                    items={boards}
                    renderItem={board => (
                        <Board key={board}>
                            <header className={styles.boardHeader}>
                                {board}
                            </header>
                            <section className={styles.boardSection}>
                                <List
                                    variant={ListVariant.tasks}
                                    items={tasks}
                                    renderItem={task => (
                                        <Task key={task}>{task}</Task>
                                    )}
                                />
                            </section>
                        </Board>
                    )}
                />
            </main>
        </div>
    );
};
