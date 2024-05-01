import { FC } from "react";
import { ITaskState } from "../../models/ITask";
import { Board } from "../board/Board";
import { List, ListVariant } from "../list/List";
import styles from "./Boards.module.scss";

export const Boards: FC = () => {
    const boards = [ITaskState.opened, ITaskState.inProcess, ITaskState.done];

    return (
        <main className={styles.boards}>
            <List
                variant={ListVariant.boards}
                items={boards}
                renderItem={board => <Board name={board} key={board} />}
            />
        </main>
    );
};
