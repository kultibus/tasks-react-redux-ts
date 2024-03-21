import { Dispatch, FC, FormEventHandler, SetStateAction } from "react";
import { IBoard } from "../../types/types";
import { Form, FormVariant } from "../UI/form/Form";
import { BoardBar } from "../boardBar/BoardBar";
import { Tasks } from "../tasks/Tasks";
import styles from "./Board.module.scss";

interface BoardProps<T> {
    addBoard: FormEventHandler<HTMLFormElement>;
    board: T;
    boards: T[];
    checkInputValidate: () => void;
    currentBoard: T;
    inputValidate: boolean;
    isFormOpened: boolean;
    setBoard: Dispatch<SetStateAction<T>>;
    setBoards: Dispatch<SetStateAction<T[]>>;
    setcurrentBoard: Dispatch<SetStateAction<T>>;
    setInputValidate: Dispatch<SetStateAction<boolean>>;
    setIsFormOpened: Dispatch<SetStateAction<boolean>>;
}

export const Board: FC<BoardProps<T>> = props => {
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
        setcurrentBoard,
        setInputValidate,
        setIsFormOpened,
    } = props;

    return (
        <div className={styles.board}>
            <BoardBar
                boards={boards}
                currentBoard={currentBoard}
                isFormOpened={isFormOpened}
                setBoards={setBoards}
                setCurrentBoard={setcurrentBoard}
                setIsFormOpened={setIsFormOpened}
            />

            <div className={styles.body}>
                {isFormOpened ? (
                    <Form
                        board={board}
                        boards={boards}
                        checkInputValidate={checkInputValidate}
                        inputValidate={inputValidate}
                        onSubmit={addBoard}
                        setBoard={setBoard}
                        setInputValidate={setInputValidate}
                        setIsFormOpened={setIsFormOpened}
                        variant={
                            boards.length
                                ? FormVariant.actual
                                : FormVariant.initial
                        }
                    />
                ) : (
                    <Tasks />
                )}
            </div>
        </div>
    );
};
