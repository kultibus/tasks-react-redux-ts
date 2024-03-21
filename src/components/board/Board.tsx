import {
    ChangeEventHandler,
    Dispatch,
    FC,
    FormEventHandler,
    SetStateAction,
} from "react";
import { IBoard } from "../../types/types";
import { BoardBar } from "../boardBar/BoardBar";
import { Form, FormVariant } from "../UI/form/Form";
import styles from "./Board.module.scss";
import { Tasks } from "../tasks/Tasks";

interface BoardProps {
    addBoard: FormEventHandler<HTMLFormElement>;
    board: IBoard;
    boards: IBoard[];
    checkInputValidate: () => void;
    inputValidate: boolean;
    isFormOpened: boolean;
    setBoardName: ChangeEventHandler<HTMLInputElement>;
    setBoards: Dispatch<SetStateAction<IBoard[]>>;
    setInputValidate: Dispatch<SetStateAction<boolean>>;
    setIsFormOpened: Dispatch<SetStateAction<boolean>>;
}

export const Board: FC<BoardProps> = props => {
    const {
        addBoard,
        board,
        boards,
        checkInputValidate,
        inputValidate,
        isFormOpened,
        setBoardName,
        setBoards,
        setInputValidate,
        setIsFormOpened,
    } = props;

    return (
        <div className={styles.board}>
            <BoardBar
                boards={boards}
                isFormOpened={isFormOpened}
                setBoards={setBoards}
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
                        setBoardName={setBoardName}
                        setInputValidate={setInputValidate}
                        setIsFormOpened={setIsFormOpened}
                        variant={
                            boards.length
                                ? FormVariant.board
                                : FormVariant.firstBoard
                        }
                    />
                ) : (
					<Tasks  />
                    // <ul className={styles.tasks}>
                    //     <li className={styles.tasks}>
                    //         <header>
                    //             <h3>Opened</h3>
                    //             <div>quantity</div>
                    //         </header>

                    //         <section>tasks opened</section>
                    //     </li>

                    //     <li className={styles.tasks}>
                    //         <header>
                    //             <h3>In process</h3>
                    //             <div>quantity</div>
                    //         </header>

                    //         <section>tasks in process</section>
                    //     </li>

                    //     <li className={styles.tasks}>
                    //         <header>
                    //             <h3>Done</h3>
                    //             <div>quantity</div>
                    //         </header>

                    //         <section>tasks done</section>
                    //     </li>
                    // </ul>
                )}
            </div>
        </div>
    );
};
