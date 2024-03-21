import { FC, FormEvent, useState } from "react";
import { IBoard } from "../../types/types";
import { Board } from "../board/Board";
import { BoardsBar } from "../boardsBar/BoardsBar";
import styles from "./Boards.module.scss";

interface BoardsProps {}

export const Boards: FC<BoardsProps> = () => {
    const [board, setBoard] = useState<IBoard>({
        id: null,
        name: "",
        current: false,
    });

    const [currentBoard, setCurrentBoard] = useState<IBoard>(board);

    const [boards, setBoards] = useState<IBoard[]>([]);
    const [isFormOpened, setIsFormOpened] = useState<boolean>(true);
    const [inputValidate, setInputValidate] = useState<boolean>(true);
	// const [formType, setFormType] = useState<string>('add')

    const checkInputValidate = () => {
        if (!board.name) setInputValidate(false);
    };

    const addBoard = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (board.name) {
            const newBoard = { ...board, id: Date.now(), current: true };

            setCurrentBoard(newBoard);

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
                setCurrentBoard={setCurrentBoard}
                boards={boards}
                isFormOpened={isFormOpened}
                setBoards={setBoards}
                setIsFormOpened={setIsFormOpened}
            />

            <Board
                currentBoard={currentBoard}
                setcurrentBoard={setCurrentBoard}
                addBoard={addBoard}
                board={board}
                boards={boards}
                checkInputValidate={checkInputValidate}
                inputValidate={inputValidate}
                isFormOpened={isFormOpened}
                setBoard={setBoard}
                setBoards={setBoards}
                setInputValidate={setInputValidate}
                setIsFormOpened={setIsFormOpened}
            />
        </div>
    );
};
