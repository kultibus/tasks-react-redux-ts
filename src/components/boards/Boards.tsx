import { FC, useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import { Board } from "../board/Board";
import { List, ListVariant } from "../list/List";
import styles from "./Boards.module.scss";
import { IFormVariant } from "../../types/models/IForm";
import { FormTask } from "../UI/form-task/FormTask";
import { ITask } from "../../types/models/ITask";
import { ITaskStatus } from "../../types/types";

export const Boards: FC = () => {
    const boards: ITaskStatus[] = ["opened", "inProcess", "done"];

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
                renderItem={board => <Board boardName={board} key={board} />}
            />
        </main>
    );
};
