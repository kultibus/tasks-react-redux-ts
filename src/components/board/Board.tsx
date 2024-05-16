import { FC, useState } from "react";
import { List, ListVariant } from "../list/List";
import { Task } from "../task/Task";
import styles from "./Board.module.scss";
import { IBoard } from "../../models/IBoard";
import { useAppSelector } from "../../hooks/redux";
import { ITaskState } from "../../models/ITask";

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
            <header>{board.name}</header>
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
