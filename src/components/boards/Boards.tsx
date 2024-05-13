import { FC } from "react";
import { useAppSelector } from "../../hooks/redux";
import { Board } from "../board/Board";
import { List, ListVariant } from "../list/List";
import styles from "./Boards.module.scss";

export const Boards: FC = () => {
    const { boards } = useAppSelector(state => state.boardsReducer);

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
