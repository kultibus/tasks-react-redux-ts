import { Dispatch, FC, FormEvent, SetStateAction } from "react";
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
    checkInputValidate: () => void;
    currentBoard: IBoard;
    formOptions: FormOptions;
    inputValidate: boolean;
    setBoard: Dispatch<SetStateAction<IBoard>>;
    setCurrentBoard: Dispatch<SetStateAction<IBoard>>;
    setFormOptions: Dispatch<SetStateAction<FormOptions>>;
    setInputValidate: Dispatch<SetStateAction<boolean>>;
}

export const Form: FC<FormProps> = props => {
    const {
        board,
        boards,
        checkInputValidate,
        inputValidate,
        addBoard,
        editBoard,
        deleteBoard,
        setBoard,
        setInputValidate,
        formOptions,
        setFormOptions,
        currentBoard,
        setCurrentBoard,
    } = props;

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        switch (formOptions.action) {
            case "Add":
                const newBoard = { ...board, id: Date.now() };

                addBoard(newBoard);

                break;

            case "Edit":
                const editedBoard = { ...currentBoard, name: board.name };

                editBoard(editedBoard);

                break;

            case "Delete":
                const deletedBoard = currentBoard;

                deleteBoard(deletedBoard);

                break;
        }
    };

    const cancelHandler = () => {
        setFormOptions({ ...formOptions, isOpened: false });

        setInputValidate(true);

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
