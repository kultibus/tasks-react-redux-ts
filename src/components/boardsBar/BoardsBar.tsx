import { Dispatch, FC, SetStateAction } from "react";
import {
    FormAction,
    FormOptions,
    FormType,
    IBoard,
    ISetState,
} from "../../types/types";
import { Button, ButtonType, ButtonVariant } from "../UI/button/Button";
import { List, ListVariant } from "../list/List";
import { Title } from "../title/Title";
import styles from "./BoardsBar.module.scss";

interface BoardsBarProps {
    boards: IBoard[];
    setBoards: ISetState<IBoard[]>;
    setCurrentBoard: ISetState<IBoard>;
    currentBoard: IBoard;
    formOptions: FormOptions;
    setFormOptions: Dispatch<SetStateAction<FormOptions>>;
}

export const BoardsBar: FC<BoardsBarProps> = props => {
    const {
        boards,
        setBoards,
        setCurrentBoard,
        currentBoard,
        formOptions,
        setFormOptions,
    } = props;

    return (
        <aside className={styles.bar}>
            <div className={styles.title}>
                <Title>Boards</Title>
            </div>

            <div className={styles.body}>
                <Button
                    onClick={() =>
                        setFormOptions({
                            action: "Add",
                            type: "Board",
                            isOpened: true,
                        })
                    }
                    type={ButtonType.button}
                    variant={
                        !formOptions.isOpened
                            ? ButtonVariant.add
                            : ButtonVariant.hidden
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
                                    board.id === currentBoard.id
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
