import { FC } from "react";
import { ITask } from "../../types/models/ITask";
import { splitByCapitalLetter } from "../../utils/formatString";
import { List, ListVariant } from "../list/List";
import { Task } from "../task/Task";
import styles from "./Board.module.scss";
import { IBoardVariant } from "../boards/Boards";
import { SortableContext, useSortable } from "@dnd-kit/sortable";

interface BoardProps {
    board: IBoardVariant;
    tasks: ITask[];
}

export const Board: FC<BoardProps> = props => {
    const { board, tasks } = props;

    // const { attributes, listeners, setNodeRef, transform, transition } =
    //     useSortable({ id: board });

    return (
        <li
            // ref={setNodeRef}
            // {...attributes}
            // {...listeners}
            className={styles.board}
        >
            <header className={styles.header}>
                <h2>Tasks {splitByCapitalLetter(board)}:</h2>
                <div className={styles.tasksQuantity}>{tasks?.length || 0}</div>
            </header>
            <section className={styles.tasks}>
                <List
                    variant={ListVariant.tasks}
                    items={tasks}
                    renderItem={task => (
                        <Task board={board} task={task} key={task.id} />
                    )}
                />
            </section>
        </li>
    );
};
