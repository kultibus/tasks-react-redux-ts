import { FC, useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import { List, ListVariant } from "../list/List";
import { Task } from "../task/Task";
import styles from "./Board.module.scss";
import { ITask, ITaskState } from "../../types/models/ITask";
import { task } from "../task/Task.module.scss";
import { DndContext, useDroppable } from "@dnd-kit/core";

interface BoardProps {
    boardName: ITaskState;
}

export const Board: FC<BoardProps> = props => {
    const { boardName } = props;

    const { tasks } = useAppSelector(state => state.tasksReducer);
    const { currentProject } = useAppSelector(state => state.projectsReducer);

    const boardTasks = useMemo(() => {
        if (tasks) {
            return tasks
                .filter(task => task.projectId === currentProject.id)
                .filter(task => task.state === boardName);
        }
        return [];
    }, [currentProject, tasks, boardName]);

    return (
        <DndContext>
            <li className={styles.board}>
                <header className={styles.header}>
                    <h2>Tasks {boardName}</h2>
                    <div className={styles.tasksQuantity}>
                        {boardTasks.length}
                    </div>
                </header>
                <section className={styles.tasks}>
                    <List
                        variant={ListVariant.tasks}
                        items={boardTasks}
                        renderItem={task => <Task task={task} key={task.id} />}
                    />
                </section>
            </li>
        </DndContext>
    );
};
