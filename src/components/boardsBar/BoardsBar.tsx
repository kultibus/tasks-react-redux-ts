import { FC } from "react";
import { FormAction, FormType, IBoard, ISetState } from "../../types/types";
import { Button, ButtonType, ButtonVariant } from "../UI/button/Button";
import { List, ListVariant } from "../list/List";
import { Title } from "../title/Title";
import styles from "./BoardsBar.module.scss";

interface BoardsBarProps {
    boards: IBoard[];
    isFormOpened: boolean;
    setBoards: ISetState<IBoard[]>;
    setCurrentBoard: ISetState<IBoard>;
    setIsFormOpened: ISetState<boolean>;
    formCallHandler: (action: FormAction, type: FormType) => void;
}

export const BoardsBar: FC<BoardsBarProps> = props => {
    const {
        boards,
        isFormOpened,
        setBoards,
        setCurrentBoard,
        setIsFormOpened,
        formCallHandler,
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
                    onClick={() => formCallHandler('Add', 'Board')}
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
