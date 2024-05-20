import { FC, useEffect, useState } from "react";
import { List, ListVariant } from "../list/List";
import { Task } from "../task/Task";
import styles from "./Board.module.scss";
import { IBoard, IBoardName } from "../../types/models/IBoard";
import { useAppSelector } from "../../hooks/redux";

interface BoardProps {
    board: IBoard;
}

export const Board: FC<BoardProps> = props => {
    const { board } = props;

    const { openedTasks, inProcessTasks, doneTasks } = useAppSelector(
        state => state.tasksReducer
    );

    const { currentProject } = useAppSelector(state => state.projectsReducer);

    return (
        <li className={styles.board}>
            <header className={styles.header}>
                <h2>Tasks {board.name}</h2>
                <div className={styles.tasksQuantity}>
                    {board.name === IBoardName.opened
                        ? `${
                              openedTasks.filter(
                                  task => task.projectId === currentProject.id
                              ).length
                          }`
                        : board.name === IBoardName.inProcess
                        ? `${
                              inProcessTasks.filter(
                                  task => task.projectId === currentProject.id
                              ).length
                          }`
                        : `${
                              doneTasks.filter(
                                  task => task.projectId === currentProject.id
                              ).length
                          }`}
                </div>
            </header>
            <section className={styles.tasks}>
                <List
                    variant={ListVariant.tasks}
                    items={
                        board.name === IBoardName.opened
                            ? openedTasks.filter(
                                  task => task.projectId === currentProject.id
                              )
                            : board.name === IBoardName.inProcess
                            ? inProcessTasks.filter(
                                  task => task.projectId === currentProject.id
                              )
                            : doneTasks.filter(
                                  task => task.projectId === currentProject.id
                              )
                    }
                    renderItem={task => <Task task={task} key={task.id} />}
                />
            </section>
        </li>
    );
};
