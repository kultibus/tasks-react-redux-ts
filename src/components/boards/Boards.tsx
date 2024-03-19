import classNames from "classnames";
import { ChangeEvent, FC, useState } from "react";
import { IBoard } from "../../types/types";
import { Button, ButtonVariant } from "../UI/button/Button";
import { Input, InputType } from "../UI/input/Input";
import styles from "./Boards.module.scss";

interface BoardsProps {
    // inputValidate: InputValidate;
    // setInputValidate: Dispatch<SetStateAction<boolean>>;
}

export const Boards: FC<BoardsProps> = props => {
    const [board, setBoard] = useState<IBoard>({ id: null, name: "" });
    const [boards, setBoards] = useState<IBoard[]>([]);
    const [isFormOpened, setIsFormOpened] = useState<boolean>(true);
    const [inputValidate, setInputValidate] = useState<boolean>(true);

    const inputBoardNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setBoard({ ...board, name: e.target.value });
    };

    const addBoard = () => {
        if (board.name) {
            const newBoard = { ...board, id: Date.now() };

            setBoards([...boards, newBoard]);

            setIsFormOpened(false);

            setBoard({ id: null, name: "" });
        } else {
            setInputValidate(false);
        }
    };

    return (
        <div className={styles.boards}>
            <h2 className={classNames(styles.header, styles.headerLeft)}>
                Boards
            </h2>
            <header
                className={classNames(styles.header, styles.headerFormTitle)}
            >
                {isFormOpened ? (
                    <h2>Create board</h2>
                ) : (
                    <div>
                        <h2>{boards[0].name}</h2>
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
                    <form onSubmit={addBoard} className={styles.form}>
                        <Input
                            value={board.name}
                            placeholder="Board name?"
                            type={InputType.text}
                            onChange={inputBoardNameHandler}
                            validate={inputValidate}
                            onClick={() => setInputValidate(true)}
                        />
                        <Button
                            // onClick={() => console.log(board)}
                            variant={ButtonVariant.add}
                        >
                            Add board
                        </Button>
                    </form>
                ) : (
                    <div>hello</div>
                )}
            </main>
        </div>
    );
};
