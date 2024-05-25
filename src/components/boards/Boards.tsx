import { FC } from "react";
import { useAppSelector } from "../../hooks/redux";
import { IFormVariant } from "../../types/models/IForm";
import { IBoards } from "../../types/types";
import { FormTask } from "../UI/form-task/FormTask";
import { Board } from "../board/Board";
import { List, ListVariant } from "../list/List";
import styles from "./Boards.module.scss";
import { useTasks } from "./useTasks";

export enum IBoardVariant {
    opened = "opened",
    inProcess = "inProcess",
    done = "done",
}

export const Boards: FC = () => {
    const boards = [
        IBoardVariant.opened,
        IBoardVariant.inProcess,
        IBoardVariant.done,
    ];

    const currentTasks = useTasks();

    const { variant, isOpened } = useAppSelector(state => state.formReducer);

    if (
        isOpened &&
        (variant === IFormVariant.addTask ||
            variant === IFormVariant.editTask ||
            variant === IFormVariant.deleteTask)
    ) {
        return <FormTask />;
    }

    return (
        <main className={styles.boards}>
            <List
                variant={ListVariant.boards}
                items={boards}
                renderItem={board => (
                    <Board
                        tasks={currentTasks[board]}
                        board={board}
                        key={board}
                    />
                )}
            />
        </main>
    );
};
