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
    editTask: (editedTask: ITask) => void;
    deleteTask: (deletedTask: ITask) => void;
    task: ITask;
    setTask: Dispatch<SetStateAction<ITask>>;
    formOptions: FormOptions;
    setBoard: Dispatch<SetStateAction<IBoard>>;
    setCurrentBoard: Dispatch<SetStateAction<IBoard>>;
    setFormOptions: Dispatch<SetStateAction<FormOptions>>;
    tasks: ITask[];
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
        editTask,
        deleteTask,
        tasks,
    } = props;

    const [inputValid, setInputValid] = useState<boolean>(true);

    const [titleValid, setTitleValid] = useState<boolean>(true);
    const [descriptionValid, setDescriptionValid] = useState<boolean>(true);

    const [inputError, setInputError] = useState<string>("");

    // const onBlurInputHandler = () => {
    //     setInputError("");

    //     setInputValid(true);

    //     setTitleValid(true);
    //     setDescriptionValid(true);
    // };

    // const onClickInputHandler = () => {
    //     setInputError("");
    // };

    const onBlurInputHandler = () => {};

    const onClickInputHandler = () => {
        setInputError("");
    };

    const boardHandler = () => {
        switch (formOptions.action) {
            case "Add":
                if (!board.name) {
                    setInputError("This field can't be empty");

                    // setInputValid(false);
                    setTitleValid(false);
                } else {
                    const newBoard = { ...board, id: Date.now() };

                    addBoard(newBoard);
                }

                break;

            case "Edit":
                if (!currentBoard.name) {
                    setInputError("This field can't be empty");

                    // setInputValid(false);
                    setTitleValid(false);
                } else {
                    const editedBoard = {
                        ...currentBoard,
                        name: currentBoard.name,
                    };

                    editBoard(editedBoard);
                }

                break;

            case "Delete":
                const deletedBoard = currentBoard;

                deleteBoard(deletedBoard);

                break;
        }
    };

    const taskHandler = () => {
        switch (formOptions.action) {
            case "Add":
                if (!task.name) {
                    setInputError("This field can't be empty");

                    setInputValid(false);
                } else {
                    const newTask: ITask = {
                        ...task,
                        id: Date.now(),
                        boardId: currentBoard.id,
                    };

                    addTask(newTask);
                }

                break;

            case "Edit":
                if (!task.name) {
                    setInputError("This field can't be empty");

                    setInputValid(false);
                } else {
                    const editedTask: ITask = tasks.find(
                        task => task.action === "Edit"
                    );

                    editedTask.name = task.name;
                    editedTask.description = task.description;

                    editTask(editedTask);
                }

                break;

            case "Delete":
                const deletedTask: ITask = tasks.find(
                    task => task.action === "Delete"
                );

                deleteTask(deletedTask);

                break;
        }
    };

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formOptions.type === "Board") {
            boardHandler();
        } else {
            taskHandler();
        }
    };

    const cancelHandler = () => {
        setFormOptions({ ...formOptions, isOpened: false });

        switch (formOptions.type) {
            case "Board":
                if (formOptions.action === "Edit") {
                    editBoard(
                        boards.find(board => board.id === currentBoard.id)
                    );
                }

                setBoard({
                    id: null,
                    name: "",
                });

                break;

            case "Task":
                if (formOptions.action === "Edit") {
                }

                setTask({
                    id: null,
                    name: "",
                    description: "",
                    status: "Opened",
                    boardId: null,
                    action: "Add",
                });

                break;
        }
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
                        formOptions.type === "Board"
                            ? boards.find(board => board.id === currentBoard.id)
                                  .name
                            : tasks.find(
                                  task =>
                                      task.action === "Edit" ||
                                      task.action === "Delete"
                              ).name
                    }"?`}</Title>
                )}
            </header>
            <section className={styles.section}>
                <form onSubmit={submitHandler} className={styles.body}>
                    {formOptions.action !== "Delete" &&
                        formOptions.type === "Board" && (
                            <Input
                                name="title"
                                onBlur={onBlurInputHandler}
                                value={
                                    formOptions.action === "Add"
                                        ? board.name
                                        : currentBoard.name
                                }
                                placeholder={
                                    inputError ||
                                    `Enter ${formOptions.type.toLowerCase()} title ...`
                                }
                                type={InputType.text}
                                onChange={e => {
                                    formOptions.action === "Add"
                                        ? setBoard({
                                              ...board,
                                              name: e.target.value,
                                          })
                                        : setCurrentBoard({
                                              ...currentBoard,
                                              name: e.target.value,
                                          });
                                }}
                                inputValid={titleValid}
                                onClick={onClickInputHandler}
                                maxLength={30}
                            />
                        )}

                    {formOptions.action !== "Delete" &&
                        formOptions.type === "Task" && (
                            <>
                                <Input
                                    name="title"
                                    maxLength={30}
                                    onBlur={onBlurInputHandler}
                                    // value={task.name}
                                    value={
                                        formOptions.action === "Add"
                                            ? task.name
                                            : tasks.find(
                                                  task => task.action === "Edit"
                                              ).name
                                    }
                                    placeholder={
                                        inputError ||
                                        `Enter ${formOptions.type.toLowerCase()} title ...`
                                    }
                                    type={InputType.text}
                                    onChange={e =>
                                        setTask({
                                            ...task,
                                            name: e.target.value,
                                        })
                                    }
                                    inputValid={titleValid}
                                    onClick={onClickInputHandler}
                                />
                                <Input
                                    name="description"
                                    // maxLength={100}
                                    onBlur={onBlurInputHandler}
                                    value={task.description}
                                    placeholder={
                                        inputError ||
                                        `Enter ${formOptions.type.toLowerCase()} description ...`
                                    }
                                    type={InputType.text}
                                    onChange={e =>
                                        setTask({
                                            ...task,
                                            description: e.target.value,
                                        })
                                    }
                                    inputValid={descriptionValid}
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
