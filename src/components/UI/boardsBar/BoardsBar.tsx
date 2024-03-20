import { Dispatch, FC, SetStateAction } from "react";
import { IBoard } from "../../../types/types";
import { Title } from "../../title/Title";
import { Button, ButtonType, ButtonVariant } from "../button/Button";
import styles from "./BoardsBar.module.scss";
import { List, ListVariant } from "../../list/List";

interface BoardsBarProps {
    boards: IBoard[];
    isFormOpened: boolean;
    setBoards: Dispatch<SetStateAction<IBoard[]>>;
    setIsFormOpened: Dispatch<SetStateAction<boolean>>;
}

export const BoardsBar: FC<BoardsBarProps> = props => {
    const { boards, isFormOpened, setIsFormOpened, setBoards } = props;

    const setCurrentBoard = (board: IBoard) => {
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
        <aside className={styles.boardsBar}>
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
                                onClick={() => setCurrentBoard(board)}
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
