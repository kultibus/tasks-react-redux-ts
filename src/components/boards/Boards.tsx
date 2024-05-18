import { FC } from "react";
import { useAppSelector } from "../../hooks/redux";
import { Board } from "../board/Board";
import { List, ListVariant } from "../list/List";
import styles from "./Boards.module.scss";
import { ITaskState } from "../../types/models/ITask";
import { IFormVariant } from "../../types/models/IForm";
import { FormTask } from "../UI/form-task/FormTask";

export const Boards: FC = () => {
    const { boards } = useAppSelector(state => state.tasksReducer);
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
                renderItem={board => <Board board={board} key={board.name} />}
            />
        </main>
    );
};
