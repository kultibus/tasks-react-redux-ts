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

    const boardService = (newBoard: IBoard) => {
        if (board.name) {
            setCurrentBoard(newBoard);

            switch (formOptions.action) {
                case "Delete":
                    setBoards([
                        ...boards.filter(bd => bd.id !== currentBoard.id),
                    ]);
                    break;

                case "Edit":
                    setBoards([
                        ...boards.map(bd => {
                            if (bd.id === currentBoard.id) {
                                return newBoard;
                            }
                            return bd;
                        }),
                    ]);

                    break;

                default:
                    setBoards([...boards, newBoard]);
            }

            setIsFormOpened(false);

            setBoard({ id: null, name: "" });
        }
    };

    return (
        <div className={styles.boards}>
            <BoardsBar
                currentBoard={currentBoard}
                boards={boards}
                isFormOpened={isFormOpened}
                setBoards={setBoards}
                setCurrentBoard={setCurrentBoard}
                setIsFormOpened={setIsFormOpened}
                formCallHandler={formCallHandler}
            />

            <Board
                boardService={boardService}
                board={board}
                boards={boards}
                checkInputValidate={checkInputValidate}
                currentBoard={currentBoard}
                formCallHandler={formCallHandler}
                formOptions={formOptions}
                inputValidate={inputValidate}
                isFormOpened={isFormOpened}
                setBoard={setBoard}
                setBoards={setBoards}
                setCurrentBoard={setCurrentBoard}
                setFormOptions={setFormOptions}
                setInputValidate={setInputValidate}
                setIsFormOpened={setIsFormOpened}
            />
        </div>
    );
};
