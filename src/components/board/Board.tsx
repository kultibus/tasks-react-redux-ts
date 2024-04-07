import { Dispatch, FC, SetStateAction } from "react";
import { FormAction, FormOptions, FormType, IBoard } from "../../types/types";
import { Form } from "../UI/form/Form";
import { BoardBar } from "../boardBar/BoardBar";
import { Tasks } from "../tasks/Tasks";
import styles from "./Board.module.scss";

interface BoardProps {
    addBoard: (newBoard: IBoard) => void;
    editBoard: (newBoard: IBoard) => void;
    deleteBoard: (newBoard: IBoard) => void;
    board: IBoard;
    boards: IBoard[];
    currentBoard: IBoard;
    setBoard: Dispatch<SetStateAction<IBoard>>;
    setBoards: Dispatch<SetStateAction<IBoard[]>>;
    setCurrentBoard: Dispatch<SetStateAction<IBoard>>;
    formOptions: FormOptions;
    setFormOptions: Dispatch<SetStateAction<FormOptions>>;
}

export const Board: FC<BoardProps> = props => {
    const {
        addBoard,
        editBoard,
        board,
        boards,
        currentBoard,
        setBoard,
        setBoards,
        setCurrentBoard,
        formOptions,
        setFormOptions,
        deleteBoard,
    } = props;

    return (
        <div>
            {formOptions.isOpened ? (
                <Form
                    deleteBoard={deleteBoard}
                    editBoard={editBoard}
                    setCurrentBoard={setCurrentBoard}
                    currentBoard={currentBoard}
                    setFormOptions={setFormOptions}
                    formOptions={formOptions}
                    board={board}
                    boards={boards}
                    addBoard={addBoard}
                    setBoard={setBoard}
                />
            ) : (
                <div className={styles.body}>
                    <BoardBar
                        setFormOptions={setFormOptions}
                        boards={boards}
                        currentBoard={currentBoard}
                        setBoards={setBoards}
                        setCurrentBoard={setCurrentBoard}
                        formOptions={formOptions}
                    />
                    <Tasks />
                </div>
            )}
        </div>
    );
};
