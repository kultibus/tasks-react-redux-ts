import classNames from "classnames";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import { IBoard } from "../../types/types";
import { Button, ButtonType, ButtonVariant } from "../UI/button/Button";
import { Input, InputType } from "../UI/input/Input";
import styles from "./Boards.module.scss";
import { Form } from "../UI/form/Form";
import { FormBottom } from "../UI/form/FormBottom";
import { BoardsBar } from "../UI/boardsBar/BoardsBar";
import { Board } from "../board/Board";

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

            const newBoards: IBoard[] = boards.map(board => ({
                ...board,
                current: false,
            }));

            setBoards([...newBoards, newBoard]);

            setIsFormOpened(false);

            setBoard({ id: null, name: "", current: false });
        }
    };

    return (
        <div className={styles.boards}>
            <BoardsBar
                boards={boards}
                isFormOpened={isFormOpened}
                setIsFormOpened={setIsFormOpened}
            />


            <div className={styles.board}>
                <header className={classNames(styles.headerTasksBar)}>
                    {isFormOpened ? (
                        <h2>Add board</h2>
                    ) : (
                        <div className={styles.boardBar}>
                            <h2>{boards.find(board => board.current).name}</h2>
                            <Button
                                type={ButtonType.button}
                                variant={ButtonVariant.add}
                            >
                                Add task
                            </Button>
                        </div>
                    )}
                </header>

                {isFormOpened ? (
                    <Form onSubmit={addBoard}>
                        <Input
                            value={board.name}
                            placeholder="Board name?"
                            type={InputType.text}
                            onChange={setBoardName}
                            validate={inputValidate}
                            onClick={() => setInputValidate(true)}
                        />
                        {boards.length ? (
                            <FormBottom
                                cancel={() => setIsFormOpened(false)}
                                checkValidate={checkInputValidate}
                            />
                        ) : (
                            <Button
                                onMouseDown={checkInputValidate}
                                type={ButtonType.submit}
                                variant={ButtonVariant.add}
                            >
                                Add board
                            </Button>
                        )}
                    </Form>
                ) : (
                    <ul className={styles.board}>
                        <li className={styles.tasks}>
                            <header>
                                <h3>Opened</h3>
                                <div>quantity</div>
                            </header>

                            <section>tasks opened</section>
                        </li>

                        <li className={styles.tasks}>
                            <header>
                                <h3>In process</h3>
                                <div>quantity</div>
                            </header>

                            <section>tasks in process</section>
                        </li>

                        <li className={styles.tasks}>
                            <header>
                                <h3>Done</h3>
                                <div>quantity</div>
                            </header>

                            <section>tasks done</section>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
};
