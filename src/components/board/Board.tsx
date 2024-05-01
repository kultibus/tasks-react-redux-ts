import { FC, useState } from "react";
import { List, ListVariant } from "../list/List";
import { Task } from "../task/Task";
import styles from "./Board.module.scss";
import { IBoard } from "../../models/IBoard";

interface BoardProps {
    board: IBoard;
}

export const Board: FC<BoardProps> = props => {
    const { board } = props;

    const [tasks, setTasks] = useState<string[]>(["task1", "task2", "task3"]);

    return (
        <li className={styles.board}>
            <header>{board.name}</header>
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
