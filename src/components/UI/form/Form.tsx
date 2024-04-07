import {
    ChangeEvent,
    Dispatch,
    FC,
    FormEvent,
    SetStateAction,
    useState,
} from "react";
import { FormOptions, IBoard } from "../../../types/types";
import { Button, ButtonType, ButtonVariant } from "../button/Button";
import { Input, InputType } from "../input/Input";
import styles from "./Form.module.scss";
import { Title } from "../../title/Title";

interface FormProps {
    addBoard: (newBoard: IBoard) => void;
    editBoard: (newBoard: IBoard) => void;
    deleteBoard: (newBoard: IBoard) => void;
    board: IBoard;
    boards: IBoard[];
    currentBoard: IBoard;
    formOptions: FormOptions;
    setBoard: Dispatch<SetStateAction<IBoard>>;
    setCurrentBoard: Dispatch<SetStateAction<IBoard>>;
    setFormOptions: Dispatch<SetStateAction<FormOptions>>;
}

export const Form: FC<FormProps> = props => {
    const {
        board,
        boards,
        addBoard,
        editBoard,
        deleteBoard,
        setBoard,
        formOptions,
        setFormOptions,
        currentBoard,
        setCurrentBoard,
    } = props;

    const [inputValid, setInputValid] = useState<boolean>(true);
    const [inputPlaceholder, setInputPlaceholder] = useState<string>(
        `Enter ${formOptions.type.toLowerCase()} title ...`
    );

    const onBlurInputHandler = () => {
        setInputPlaceholder(
            `Enter ${formOptions.type.toLowerCase()} title ...`
        );
        setInputValid(true);
    };

    const onClickInputHandler = () => {
        setInputPlaceholder(
            `Enter ${formOptions.type.toLowerCase()} title ...`
        );
    };

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!board.name) {
            if (formOptions.action === "Delete") {
                const deletedBoard = currentBoard;

                deleteBoard(deletedBoard);
            } else {
                setInputPlaceholder("This field can't be empty");

                setInputValid(false);
            }
        } else {
            switch (formOptions.action) {
                case "Add":
                    const newBoard = { ...board, id: Date.now() };

                    addBoard(newBoard);

                    break;

                case "Edit":
                    const editedBoard = { ...currentBoard, name: board.name };

                    editBoard(editedBoard);

                    break;
            }
        }
    };

    const cancelHandler = () => {
        setFormOptions({ ...formOptions, isOpened: false });

        setBoard({
            id: null,
            name: "",
        });
    };

    return (
        <div className={styles.form}>
            <header className={styles.header}>
                {formOptions.action === "Add" ? (
                    <Title>{`${
                        formOptions.action
                    } ${formOptions.type.toLowerCase()}`}</Title>
                ) : (
                    <Title>{`${
                        formOptions.action
                    } ${formOptions.type.toLowerCase()} "${
                        currentBoard.name
                    }"?`}</Title>
                )}
            </header>
            <section className={styles.section}>
                <form onSubmit={submitHandler} className={styles.body}>
                    {formOptions.action !== "Delete" && (
                        <Input
                            onBlur={onBlurInputHandler}
                            value={board.name}
                            placeholder={inputPlaceholder}
                            type={InputType.text}
                            onChange={e =>
                                setBoard({ ...board, name: e.target.value })
                            }
                            inputValid={inputValid}
                            onClick={onClickInputHandler}
                        />
                    )}

                    <div className={styles.btns}>
                        <Button
                            type={ButtonType.submit}
                            variant={ButtonVariant.add}
                        >
                            {formOptions.action}
                        </Button>

                        {boards.length ? (
                            <Button
                                onClick={cancelHandler}
                                type={ButtonType.button}
                                variant={ButtonVariant.add}
                            >
                                Cancel
                            </Button>
                        ) : null}
                    </div>
                </form>
            </section>
        </div>
    );
};
