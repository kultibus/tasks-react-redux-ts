import { Dispatch, FC, SetStateAction } from "react";
import { FormOptions, IBoard, ITask } from "../../types/types";
import { Form } from "../UI/form/Form";
import { BoardBar } from "../boardBar/BoardBar";
import { Tasks } from "../tasks/Tasks";

interface BoardProps {
    addBoard: (newBoard: IBoard) => void;
    board: IBoard;
    boards: IBoard[];
    currentBoard: IBoard;
    deleteBoard: (newBoard: IBoard) => void;
    editBoard: (newBoard: IBoard) => void;
    formOptions: FormOptions;
    setBoard: Dispatch<SetStateAction<IBoard>>;
    setBoards: Dispatch<SetStateAction<IBoard[]>>;
    setCurrentBoard: Dispatch<SetStateAction<IBoard>>;
    setFormOptions: Dispatch<SetStateAction<FormOptions>>;
    tasks: ITask[];
    addTask: (newTask: ITask) => void;
    task: ITask;
    setTask: Dispatch<SetStateAction<ITask>>;
    editTask: (editedTask: ITask) => void;
    deleteTask: (deletedTask: ITask) => void;
    setTasks: Dispatch<SetStateAction<ITask[]>>;
    setCurrentTask: Dispatch<SetStateAction<ITask>>;
}

export const Board: FC<BoardProps> = props => {
    const {
        addBoard,
        addTask,
        board,
        boards,
        currentBoard,
        deleteBoard,
        editBoard,
        formOptions,
        setBoard,
        setBoards,
        setCurrentBoard,
        setFormOptions,
        setTask,
        task,
        tasks,
        editTask,
        setTasks,
        deleteTask,
        setCurrentTask,
    } = props;

    return (
        <div>
            {formOptions.isOpened ? (
                <Form
                    deleteTask={deleteTask}
                    tasks={tasks}
                    editTask={editTask}
                    addBoard={addBoard}
                    addTask={addTask}
                    board={board}
                    boards={boards}
                    currentBoard={currentBoard}
                    deleteBoard={deleteBoard}
                    editBoard={editBoard}
                    formOptions={formOptions}
                    setBoard={setBoard}
                    setCurrentBoard={setCurrentBoard}
                    setFormOptions={setFormOptions}
                    setTask={setTask}
                    task={task}
                />
            ) : (
                <div className={styles.body}>
                    <BoardBar
                        boards={boards}
                        currentBoard={currentBoard}
                        formOptions={formOptions}
                        setBoards={setBoards}
                        setCurrentBoard={setCurrentBoard}
                        setFormOptions={setFormOptions}
                    />
                    <Tasks
                        setCurrentTask={setCurrentTask}
                        setTasks={setTasks}
                        currentBoard={currentBoard}
                        setFormOptions={setFormOptions}
                        tasks={tasks}
                    />
                </div>
            )}
        </div>
    );
};
