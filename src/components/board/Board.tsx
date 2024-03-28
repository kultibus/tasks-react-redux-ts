import { Dispatch, FC, SetStateAction } from "react";
import { FormAction, FormOptions, FormType, IBoard } from "../../types/types";
import { Form } from "../UI/form/Form";
import { BoardBar } from "../boardBar/BoardBar";
import { Tasks } from "../tasks/Tasks";
import styles from "./Board.module.scss";

interface BoardProps {
    addBoard: (newBoard: IBoard) => void;
    editBoard: (newBoard: IBoard) => void;
    board: IBoard;
    boards: IBoard[];
    checkInputValidate: () => void;
    currentBoard: IBoard;
    inputValidate: boolean;
    isFormOpened: boolean;
    setBoard: Dispatch<SetStateAction<IBoard>>;
    setBoards: Dispatch<SetStateAction<IBoard[]>>;
    setCurrentBoard: Dispatch<SetStateAction<IBoard>>;
    setInputValidate: Dispatch<SetStateAction<boolean>>;
    setIsFormOpened: Dispatch<SetStateAction<boolean>>;
    formOptions: FormOptions;
    setFormOptions: Dispatch<SetStateAction<FormOptions>>;
    formCallHandler: (action: FormAction, type: FormType) => void;
}

export const Board: FC<BoardProps> = props => {
    const {
        addBoard,
        board,
        boards,
        checkInputValidate,
        currentBoard,
        inputValidate,
        isFormOpened,
        setBoard,
        setBoards,
        setCurrentBoard,
        setInputValidate,
        setIsFormOpened,
        formOptions,
        setFormOptions,
        formCallHandler,
        editBoard,
    } = props;

    return (
        <div>
            {isFormOpened ? (
                <Form
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
                    setIsFormOpened={setIsFormOpened}
                />
            ) : (
                <div className={styles.body}>
                    <BoardBar
                        setFormOptions={setFormOptions}
                        boards={boards}
                        currentBoard={currentBoard}
                        isFormOpened={isFormOpened}
                        setBoards={setBoards}
                        setCurrentBoard={setCurrentBoard}
                        setIsFormOpened={setIsFormOpened}
                        formOptions={formOptions}
                        formCallHandler={formCallHandler}
                    />
                    <Tasks />
                </div>
            )}
        </div>
    );
};
