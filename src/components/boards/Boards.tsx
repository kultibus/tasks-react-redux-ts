import { FC, useState } from "react";
import { FormOptions, IBoard, ITask, ITasks } from "../../types/types";
import { Board } from "../board/Board";
import { BoardsBar } from "../boardsBar/BoardsBar";
import styles from "./Boards.module.scss";

interface BoardsProps {}

export const Boards: FC<BoardsProps> = () => {
    const [board, setBoard] = useState<IBoard>({
        id: null,
        name: "",
    });

    const [task, setTask] = useState<ITask>({
        id: null,
        name: "",
        description: "",
        type: "Opened",
        boardId: null,
    });

    const [currentBoard, setCurrentBoard] = useState<IBoard>({
        id: null,
        name: "",
    });

    const [boards, setBoards] = useState<IBoard[]>([]);

    const [formOptions, setFormOptions] = useState<FormOptions>({
        type: "Board",
        action: "Add",
        isOpened: true,
    });

    const [currentTask, setCurrentTask] = useState<ITask>({
        id: null,
        name: "",
        description: "",
        type: "Opened",
        boardId: null,
    });

    const [tasks, setTasks] = useState<ITask[]>([]);

    const addBoard = (newBoard: IBoard) => {
        setBoards([...boards, newBoard]);

        setCurrentBoard(newBoard);

        setFormOptions({
            ...formOptions,
            isOpened: false,
        });

        setBoard({ id: null, name: "" });
    };

    const editBoard = (editedBoard: IBoard) => {
        setBoards([
            ...boards.map(bd => {
                if (bd.id === editedBoard.id) {
                    return editedBoard;
                }
                return bd;
            }),
        ]);

        setCurrentBoard(editedBoard);

        setFormOptions({
            ...formOptions,
            isOpened: false,
        });

        setBoard({ id: null, name: "" });
    };

    const deleteBoard = (deletedBoard: IBoard) => {
        const deletedBoardIndex = boards.indexOf(deletedBoard);

        setTasks([...tasks.filter(task => task.boardId !== deletedBoard.id)]);

        if (boards.length < 2) {
            setBoards([]);

            setCurrentBoard({ id: null, name: "" });

            setFormOptions({
                action: "Add",
                type: "Board",
                isOpened: true,
            });

            setBoard({ id: null, name: "" });
        } else {
            setBoards([...boards.filter(bd => bd.id !== deletedBoard.id)]);

            if (deletedBoardIndex === 0) {
                setCurrentBoard(boards[1]);
            } else {
                setCurrentBoard(boards[deletedBoardIndex - 1]);
            }

            setFormOptions({
                ...formOptions,
                isOpened: false,
            });

            setBoard({ id: null, name: "" });
        }
    };

    const addTask = (newTask: ITask) => {
        setTasks([...tasks, newTask]);

        setFormOptions({
            ...formOptions,
            isOpened: false,
        });

        setTask({
            id: null,
            name: "",
            description: "",
            type: "Opened",
            boardId: null,
        });
    };

    const editTask = (editedTask: ITask) => {
        setFormOptions({
            ...formOptions,
            isOpened: false,
        });

        setTask({
            id: null,
            name: "",
            description: "",
            type: "Opened",
            boardId: null,
        });
    };

    return (
        <div className={styles.boards}>
            <BoardsBar
                formOptions={formOptions}
                setFormOptions={setFormOptions}
                currentBoard={currentBoard}
                boards={boards}
                setBoards={setBoards}
                setCurrentBoard={setCurrentBoard}
            />

            <Board
                editTask={editTask}
                addTask={addTask}
                task={task}
                setTask={setTask}
                tasks={tasks}
                deleteBoard={deleteBoard}
                editBoard={editBoard}
                addBoard={addBoard}
                board={board}
                boards={boards}
                currentBoard={currentBoard}
                formOptions={formOptions}
                setBoard={setBoard}
                setBoards={setBoards}
                setCurrentBoard={setCurrentBoard}
                setFormOptions={setFormOptions}
            />
        </div>
    );
};
