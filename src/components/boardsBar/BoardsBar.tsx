import { Dispatch, FC, SetStateAction } from "react";
import { IBoard } from "../../types/types";
import { Title } from "../title/Title";
import { Button, ButtonType, ButtonVariant } from "../UI/button/Button";
import styles from "./BoardsBar.module.scss";
import { List, ListVariant } from "../list/List";

type MyTest<T> = Dispatch<SetStateAction<T>>;

interface BoardsBarProps<T> {
    boards: T[];
    isFormOpened: boolean;
    setBoards: MyTest<T[]>;
    setCurrentBoard: MyTest<T>;
    setIsFormOpened: MyTest<boolean>;
}

export const BoardsBar: FC<BoardsBarProps<T>> = props => {
    const {
        boards,
        isFormOpened,
        setBoards,
        setCurrentBoard,
        setIsFormOpened,
    } = props;

    const clickHandler = (board: IBoard) => {
        setCurrentBoard(board);

        setBoards([
            ...boards.map(bd =>
                bd.id === board.id
                    ? { ...bd, current: true }
                    : {
                          ...bd,
                          current: false,
                      }
            ),
        ]);
    };

    return (
        <aside className={styles.bar}>
            <div className={styles.title}>
                <Title>Boards</Title>
            </div>

            <div className={styles.body}>
                <Button
                    onClick={() => setIsFormOpened(true)}
                    type={ButtonType.button}
                    variant={
                        !isFormOpened ? ButtonVariant.add : ButtonVariant.hidden
                    }
                >
                    Add board
                </Button>

                <List
                    variant={ListVariant.boards}
                    items={boards}
                    renderItem={(board: IBoard) => (
                        <li key={board.id}>
                            <Button
                                onClick={() => clickHandler(board)}
                                type={ButtonType.button}
                                variant={
                                    board.current
                                        ? ButtonVariant.active
                                        : ButtonVariant.list
                                }
                            >
                                {board.name}
                            </Button>
                        </li>
                    )}
                />
            </div>
        </aside>
    );
};
