import {
    ChangeEvent,
    Dispatch,
    FC,
    FormEvent,
    SetStateAction,
    useState,
} from "react";
import { FormOptions, IBoard, ITask } from "../../../types/types";
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
    addTask: (newTask: ITask) => void;
    task: ITask;
    setTask: Dispatch<SetStateAction<ITask>>;
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
        addTask,
        task,
        setTask,
    } = props;

    const [inputValid, setInputValid] = useState<boolean>(true);
    const [inputPlaceholder, setInputPlaceholder] = useState<string>(
        `Enter ${formOptions.type.toLowerCase()} title ...`
    );

    const [inputErrorPlaceholder, setInputErrorPlaceholder] =
        useState<string>("");

    const onBlurInputHandler = () => {
        // setInputPlaceholder(
        //     `Enter ${formOptions.type.toLowerCase()} title ...`
        // );
        setInputErrorPlaceholder("");
        setInputValid(true);
    };

    const onClickInputHandler = () => {
        setInputErrorPlaceholder("");
        // setInputPlaceholder(
        //     `Enter ${formOptions.type.toLowerCase()} title ...`
        // );
    };

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!board.name) {
            if (formOptions.action === "Delete") {
                const deletedBoard = currentBoard;

                deleteBoard(deletedBoard);
            } else {
                // setInputPlaceholder("This field can't be empty");

                setInputErrorPlaceholder("This field can't be empty");

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
                    {formOptions.action !== "Delete" &&
                        formOptions.type === "Board" && (
                            <Input
                                onBlur={onBlurInputHandler}
                                value={board.name}
                                // placeholder={inputPlaceholder}
                                placeholder={
                                    inputErrorPlaceholder ||
                                    `Enter ${formOptions.type.toLowerCase()} title ...`
                                }
                                type={InputType.text}
                                onChange={e =>
                                    setBoard({ ...board, name: e.target.value })
                                }
                                inputValid={inputValid}
                                onClick={onClickInputHandler}
                                maxLength={30}
                            />
                        )}

                    {formOptions.action !== "Delete" &&
                        formOptions.type === "Task" && (
                            <>
                                <Input
                                    maxLength={30}
                                    onBlur={onBlurInputHandler}
                                    value={task.title}
                                    placeholder={
                                        inputErrorPlaceholder ||
                                        `Enter ${formOptions.type.toLowerCase()} title ...`
                                    }
                                    type={InputType.text}
                                    onChange={e =>
                                        setTask({
                                            ...task,
                                            title: e.target.value,
                                        })
                                    }
                                    inputValid={inputValid}
                                    onClick={onClickInputHandler}
                                />
                                <Input
                                    maxLength={100}
                                    onBlur={onBlurInputHandler}
                                    value={task.description}
                                    placeholder={
                                        inputErrorPlaceholder ||
                                        `Enter ${formOptions.type.toLowerCase()} description ...`
                                    }
                                    type={InputType.text}
                                    onChange={e =>
                                        setTask({
                                            ...task,
                                            description: e.target.value,
                                        })
                                    }
                                    inputValid={inputValid}
                                    onClick={onClickInputHandler}
                                />
                            </>
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
