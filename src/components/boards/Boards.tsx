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

            setBoards([...boards, newBoard]);

            setIsFormOpened(false);

            setBoard({ id: null, name: "", current: false });
        }
    };

    return (
        <div className={styles.boards}>
            <header className={classNames(styles.header, styles.headerLeft)}>
                <h2>Boards</h2>
            </header>

            <header className={classNames(styles.header)}>
                {isFormOpened ? (
                    <h2>Create board</h2>
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
                <div>Boards lists</div>
                <div>Boards lists</div>
                <div>Boards lists</div>
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
                            onClick={() => console.log("test")}
                            type={ButtonType.submit}
                            variant={ButtonVariant.add}
                        >
                            Add board
                        </Button>
                    </Form>
                ) : (
                    <div className={styles.tasks}>
                        <header>
                            <div>
                                <h3>Opened</h3>
                                <div>quantity</div>
                            </div>
                            <div>
                                <h3>In process</h3>
                                <div>quantity</div>
                            </div>
                            <div>
                                <h3>Done</h3>
                                <div>quantity</div>
                            </div>
                        </header>
                        <div>
                            <section>tasks opened</section>
                            <section>tasks in process</section>
                            <section>tasks done</section>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};
