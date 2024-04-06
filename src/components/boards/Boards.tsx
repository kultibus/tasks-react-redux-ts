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

    const [currentBoard, setCurrentBoard] = useState<IBoard>({
        id: null,
        name: "",
    });

    const [boards, setBoards] = useState<IBoard[]>([]);
    const [inputValidate, setInputValidate] = useState<boolean>(true);

    const [formOptions, setFormOptions] = useState<FormOptions>({
        type: "Board",
        action: "Add",
        isOpened: true,
    });

    const checkInputValidate = () => {
        // if (!board.name) setInputValidate(false);
    };

    const addBoard = (newBoard: IBoard) => {
        setBoards([...boards, newBoard]);

        setCurrentBoard(newBoard);

        setFormOptions({
            ...formOptions,
            isOpened: false,
        });

        setBoard({ id: null, name: "" });
    };

    const editBoard = (editedBoard: IBoard) => {
        setBoards([
            ...boards.map(bd => {
                if (bd.id === editedBoard.id) {
                    return editedBoard;
                }
                return bd;
            }),
        ]);

        setCurrentBoard(editedBoard);

        setFormOptions({
            ...formOptions,
            isOpened: false,
        });

        setBoard({ id: null, name: "" });
    };

    const deleteBoard = (deletedBoard: IBoard) => {
        const deletedBoardIndex = boards.indexOf(deletedBoard);

        if (boards.length < 2) {
            setBoards([]);

            setCurrentBoard({ id: null, name: "" });

            setFormOptions({
                action: "Add",
                type: "Board",
                isOpened: true,
            });

            setBoard({ id: null, name: "" });
        } else {
            setBoards([...boards.filter(bd => bd.id !== deletedBoard.id)]);

            if (deletedBoardIndex === 0) {
                setCurrentBoard(boards[1]);
            } else {
                setCurrentBoard(boards[deletedBoardIndex - 1]);
            }

            setFormOptions({
                ...formOptions,
                isOpened: false,
            });

            setBoard({ id: null, name: "" });
        }
    };

    return (
        <div className={styles.boards}>
            <BoardsBar
                formOptions={formOptions}
                setFormOptions={setFormOptions}
                currentBoard={currentBoard}
                boards={boards}
                setBoards={setBoards}
                setCurrentBoard={setCurrentBoard}
            />

            <Board
                deleteBoard={deleteBoard}
                editBoard={editBoard}
                addBoard={addBoard}
                board={board}
                boards={boards}
                checkInputValidate={checkInputValidate}
                currentBoard={currentBoard}
                formOptions={formOptions}
                inputValidate={inputValidate}
                setBoard={setBoard}
                setBoards={setBoards}
                setCurrentBoard={setCurrentBoard}
                setFormOptions={setFormOptions}
                setInputValidate={setInputValidate}
            />
        </div>
    );
};
