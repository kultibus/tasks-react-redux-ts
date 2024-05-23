import { FC, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ITask } from "../../types/models/ITask";
import { List, ListVariant } from "../list/List";
import { Task } from "../task/Task";
import styles from "./Board.module.scss";
import { splitByCapitalLetter } from "../../utils/formatString";
import { task } from "../task/Task.module.scss";
import { ITaskStatus } from "../../types/types";

interface BoardProps {
    boardName: ITaskStatus;
}

export const Board: FC<BoardProps> = props => {
    const { boardName } = props;

    const { opened } = useAppSelector(state => state.tasksReducer);
    const { currentProject } = useAppSelector(state => state.projectsReducer);

    const dispatch = useAppDispatch();

    const [boardTasks, setBoardTasks] = useState<ITask[]>([]);

    // useMemo(() => {
    //     const projectTasks = tasks.find(
    //         item => item.projectId === currentProject.id
    //     );
    //     if (projectTasks) {
	// 		setBoardTasks(projectTasks[boardName]);
    //     }
    // }, [tasks, currentProject]);



    return (
        <li className={styles.board}>
            <header className={styles.header}>
                <h2>Tasks {splitByCapitalLetter(boardName)}:</h2>
                <div className={styles.tasksQuantity}>{boardTasks.length}</div>
            </header>
            <section className={styles.tasks}>
                <List
                    variant={ListVariant.tasks}
                    items={boardTasks}
                    renderItem={task => <Task task={task} key={task.id} />}
                />
            </section>
        </li>
    );
};
