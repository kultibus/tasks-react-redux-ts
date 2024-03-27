import { Dispatch, FC, FormEvent, SetStateAction } from "react";
import { FormOptions, IBoard } from "../../../types/types";
import { Button, ButtonType, ButtonVariant } from "../button/Button";
import { Input, InputType } from "../input/Input";
import styles from "./Form.module.scss";
import { Title } from "../../title/Title";

interface FormProps {
    board: IBoard;
    boards: IBoard[];
    checkInputValidate: () => void;
    inputValidate: boolean;
    addBoard: (newBoard: IBoard) => void;
    setBoard: Dispatch<SetStateAction<IBoard>>;
    setInputValidate: Dispatch<SetStateAction<boolean>>;
    setIsFormOpened: Dispatch<SetStateAction<boolean>>;
    formOptions: FormOptions;
    setFormOptions: Dispatch<SetStateAction<FormOptions>>;
    currentBoard: IBoard;
}

export const Form: FC<FormProps> = props => {
    const {
        board,
        boards,
        checkInputValidate,
        inputValidate,
        addBoard,
        setBoard,
        setInputValidate,
        setIsFormOpened,
        formOptions,
        setFormOptions,
        currentBoard,
    } = props;

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newBoard = { ...board, id: Date.now(), current: true };

        addBoard(newBoard);
    };

    const cancelHandler = () => {
        setIsFormOpened(false);

        setInputValidate(true);

        setBoard({
            id: null,
            name: "",
            current: false,
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
                            value={board.name}
                            placeholder={`${formOptions.type} name?`}
                            type={InputType.text}
                            onChange={e =>
                                setBoard({ ...board, name: e.target.value })
                            }
                            validate={inputValidate}
                            onClick={() => setInputValidate(true)}
                        />
                    )}

                    <div className={styles.btns}>
                        <Button
                            onMouseDown={checkInputValidate}
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
