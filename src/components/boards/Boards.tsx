import { ChangeEvent, FC, FormEvent, useState } from "react";
import { IBoard } from "../../types/types";
import { BoardsBar } from "../boardsBar/BoardsBar";
import { Board } from "../board/Board";
import styles from "./Boards.module.scss";

interface BoardsProps {}

export const Boards: FC<BoardsProps> = () => {
    const [board, setBoard] = useState<IBoard>({
        id: null,
        name: "",
        current: false,
    });
    const [boards, setBoards] = useState<IBoard[]>([]);
    const [isFormOpened, setIsFormOpened] = useState<boolean>(true);
    const [inputValidate, setInputValidate] = useState<boolean>(true);

    const setBoardName = (e: ChangeEvent<HTMLInputElement>) => {
        setBoard({ ...board, name: e.target.value });
    };

    const checkInputValidate = () => {
        if (!board.name) setInputValidate(false);
    };

    const addBoard = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (board.name) {
            const newBoard = { ...board, id: Date.now(), current: true };

            setBoards([
                ...boards.map(board => ({
                    ...board,
                    current: false,
                })),
                newBoard,
            ]);

            setIsFormOpened(false);

            setBoard({ id: null, name: "", current: false });
        }
    };

    return (
        <div className={styles.boards}>
            <BoardsBar
                boards={boards}
                isFormOpened={isFormOpened}
                setBoards={setBoards}
                setIsFormOpened={setIsFormOpened}
            />

            <Board
                addBoard={addBoard}
                board={board}
                boards={boards}
                checkInputValidate={checkInputValidate}
                inputValidate={inputValidate}
                isFormOpened={isFormOpened}
                setBoardName={setBoardName}
                setBoards={setBoards}
                setInputValidate={setInputValidate}
                setIsFormOpened={setIsFormOpened}
            />
        </div>
    );
};
