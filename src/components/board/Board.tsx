import { FC, useState } from "react";
import { List, ListVariant } from "../list/List";
import { Task } from "../task/Task";
import styles from "./Board.module.scss";

interface BoardProps {
    name: string;
}

export const Board: FC<BoardProps> = props => {
    const { name } = props;

    const [tasks, setTasks] = useState<string[]>(["task1", "task2", "task3"]);

    return (
        <li className={styles.board}>
            <header>{name}</header>
            <section className={styles.tasks}>
                <List
                    variant={ListVariant.tasks}
                    items={tasks}
                    renderItem={task => <Task key={task}>{task}</Task>}
                />
            </section>
        </li>
    );
};
