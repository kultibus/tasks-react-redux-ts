import { FC, useEffect, useMemo, useState } from "react";
import { List, ListVariant } from "../list/List";
import { Task } from "../task/Task";
import styles from "./Board.module.scss";
import { IBoard } from "../../types/models/IBoard";
import { useAppSelector } from "../../hooks/redux";
import { task } from "../task/Task.module.scss";

interface BoardProps {
    board: IBoard;
}

export const Board: FC<BoardProps> = props => {
    const { board } = props;

    const { tasks } = useAppSelector(state => state.tasksReducer);
    const { currentProject } = useAppSelector(state => state.projectsReducer);

    const currentProjectTasks = useMemo(() => {
        if (tasks) {
            return tasks.filter(task => task.id === currentProject.id);
        }
        return [];
    }, [tasks, currentProject]);

	console.log(currentProjectTasks)

    return (
        <li className={styles.board}>
            <header className={styles.header}>
                <h2>Tasks {board}</h2>
                <div className={styles.tasksQuantity}>
                    {/* {board.name === IBoardName.opened
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
                          }`} */}
                </div>
            </header>
            <section className={styles.tasks}>
                <List
                    variant={ListVariant.tasks}
                    items={currentProjectTasks}
                    renderItem={task => <Task task={task} key={task.id} />}
                />
            </section>
        </li>
    );
};
