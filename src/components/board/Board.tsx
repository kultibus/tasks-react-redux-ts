import { useDroppable } from "@dnd-kit/core";
import {
	SortableContext,
	verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { FC } from "react";
import { ITask } from "../../types/models/ITask";
import { splitByCapitalLetter } from "../../utils/formatString";
import { IBoardVariant } from "../boards/Boards";
import { List, ListVariant } from "../list/List";
import { Task } from "../task/Task";
import styles from "./Board.module.scss";

interface BoardProps {
    board: IBoardVariant;
    tasks: ITask[];
}

export const Board: FC<BoardProps> = props => {
    const { board, tasks } = props;

    const { setNodeRef } = useDroppable({
        id: board,
    });


    return (
        <li ref={setNodeRef} className={styles.board}>
            <header className={styles.header}>
                <h2>{splitByCapitalLetter(board)}:</h2>
                <div className={styles.tasksQuantity}>{tasks?.length || 0}</div>
            </header>
            <section className={styles.tasks}>
                <SortableContext
                    strategy={verticalListSortingStrategy}
                    items={tasks}
                >
                    <List
                        variant={ListVariant.tasks}
                        items={tasks}
                        renderItem={task => (
                            <Task board={board} task={task} key={task.id} />
                        )}
                    />
                </SortableContext>
            </section>
        </li>
    );
};
