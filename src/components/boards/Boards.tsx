import classNames from "classnames";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import { IBoard } from "../../types/types";
import { Button, ButtonType, ButtonVariant } from "../UI/button/Button";
import { Input, InputType } from "../UI/input/Input";
import styles from "./Boards.module.scss";
import { Form } from "../UI/form/Form";

interface BoardsProps {
    // inputValidate: InputValidate;
    // setInputValidate: Dispatch<SetStateAction<boolean>>;
}

export const Boards: FC<BoardsProps> = () => {
    const [board, setBoard] = useState<IBoard>({
        id: null,
        name: "",
        current: false,
    });
    const [boards, setBoards] = useState<IBoard[]>([]);
    const [isFormOpened, setIsFormOpened] = useState<boolean>(true);
    const [inputValidate, setInputValidate] = useState<boolean>(true);

    const inputBoardNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setBoard({ ...board, name: e.target.value });
    };

    const addBoard = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!board.name) {
            setInputValidate(false);
        } else {
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

    console.log("render");

    return (
        <div className={styles.boards}>
            <header className={classNames(styles.header, styles.headerLeft)}>
                <h2>Boards</h2>
            </header>

            <header className={classNames(styles.header)}>
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

            <aside className={styles.menu}>
                {!isFormOpened && (
                    <Button
                        onClick={() => setIsFormOpened(true)}
                        type={ButtonType.button}
                        variant={ButtonVariant.add}
                    >
                        Add board
                    </Button>
                )}
                <div>
                    <ul>
                        <h3>Boards list</h3>
						{boards.map(board => <li>{board.name}</li>)}
                    </ul>
                </div>
            </aside>

            <main className={styles.main}>
                {isFormOpened ? (
                    <Form onSubmit={addBoard}>
                        <Input
                            value={board.name}
                            placeholder="Board name?"
                            type={InputType.text}
                            onChange={inputBoardNameHandler}
                            validate={inputValidate}
                            onClick={() => setInputValidate(true)}
                        />

                        <Button
                            type={ButtonType.submit}
                            variant={ButtonVariant.add}
                        >
                            Add board
                        </Button>
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
            </main>
        </div>
    );
};
