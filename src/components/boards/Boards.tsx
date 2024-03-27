import { FC, useState } from "react";
import { FormAction, FormOptions, FormType, IBoard } from "../../types/types";
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

    const [formOptions, setFormOptions] = useState<FormOptions>({
        type: "Board",
        action: "Add",
    });

    function formCallHandler(action: FormAction, type: FormType) {
        setFormOptions({
            ...formOptions,
            action: action,
            type: type,
        });

        setIsFormOpened(true);
    }

	

    const checkInputValidate = () => {
        if (!board.name) setInputValidate(false);
    };

    const addBoard = (newBoard: IBoard) => {
        if (board.name) {
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
                boards={boards}
                isFormOpened={isFormOpened}
                setBoards={setBoards}
                setCurrentBoard={setCurrentBoard}
                setIsFormOpened={setIsFormOpened}
                formCallHandler={formCallHandler}
            />

            <Board
                formCallHandler={formCallHandler}
                setFormOptions={setFormOptions}
                formOptions={formOptions}
                addBoard={addBoard}
                board={board}
                boards={boards}
                checkInputValidate={checkInputValidate}
                currentBoard={currentBoard}
                inputValidate={inputValidate}
                isFormOpened={isFormOpened}
                setBoard={setBoard}
                setBoards={setBoards}
                setcurrentBoard={setCurrentBoard}
                setInputValidate={setInputValidate}
                setIsFormOpened={setIsFormOpened}
            />
        </div>
    );
};
