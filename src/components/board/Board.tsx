import { FC, useEffect, useState } from "react";
import { List, ListVariant } from "../list/List";
import { Task } from "../task/Task";
import styles from "./Board.module.scss";
import { IBoard } from "../../types/models/IBoard";
import { useAppSelector } from "../../hooks/redux";
import { ITaskState } from "../../types/models/ITask";

interface BoardProps {
    board: IBoard;
}

export const Board: FC<BoardProps> = props => {
    const { board } = props;

    const { openedTasks, inProcessTasks, doneTasks } = useAppSelector(
        state => state.tasksReducer
    );

    return (
        <li className={styles.board}>
            <header className={styles.header}>
                <h2>Tasks {board.name}</h2>
                <div className={styles.tasksQuantity}>
                    {board.name === ITaskState.opened
                        ? `${openedTasks.length}`
                        : board.name === ITaskState.inProcess
                        ? `${inProcessTasks.length}`
                        : `${doneTasks.length}`}
                </div>
            </header>
            <section className={styles.tasks}>
                <List
                    variant={ListVariant.tasks}
                    items={
                        board.name === ITaskState.opened
                            ? openedTasks
                            : board.name === ITaskState.inProcess
                            ? inProcessTasks
                            : doneTasks
                    }
                    renderItem={task => <Task task={task} key={task.id} />}
                />
            </section>
        </li>
    );
};
