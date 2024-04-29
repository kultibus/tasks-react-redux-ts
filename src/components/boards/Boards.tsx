import { FC, useMemo, useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import { Board } from "../board/Board";
import { List, ListVariant } from "../list/List";
import styles from "./Boards.module.scss";

interface BoardsProps {}

export const Boards: FC<BoardsProps> = () => {
    const [boards] = useState<string[]>(["Opened", "In process", "Done"]);

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
