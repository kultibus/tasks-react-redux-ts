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
    checkInputValidate: () => void;
    currentBoard: IBoard;
    inputValidate: boolean;
    setBoard: Dispatch<SetStateAction<IBoard>>;
    setBoards: Dispatch<SetStateAction<IBoard[]>>;
    setCurrentBoard: Dispatch<SetStateAction<IBoard>>;
    setInputValidate: Dispatch<SetStateAction<boolean>>;
    formOptions: FormOptions;
    setFormOptions: Dispatch<SetStateAction<FormOptions>>;
}

export const Board: FC<BoardProps> = props => {
    const {
        addBoard,
        editBoard,
        board,
        boards,
        checkInputValidate,
        currentBoard,
        inputValidate,
        setBoard,
        setBoards,
        setCurrentBoard,
        setInputValidate,
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
                    checkInputValidate={checkInputValidate}
                    inputValidate={inputValidate}
                    addBoard={addBoard}
                    setBoard={setBoard}
                    setInputValidate={setInputValidate}
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
