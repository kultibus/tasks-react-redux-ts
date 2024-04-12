import { Dispatch, FC, SetStateAction } from "react";
import {
    FormOptions,
    IBoard,
    ISetState,
    ITask,
    ITasks,
} from "../../types/types";
import { Form } from "../UI/form/Form";
import { BoardBar } from "../boardBar/BoardBar";
import { Tasks } from "../tasks/Tasks";
import styles from "./Board.module.scss";

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
    setTasksDone: ISetState<ITasks>;
    setTasksInProcess: ISetState<ITasks>;
    setTasksOpened: ISetState<ITasks>;
    tasks: Array<ITasks>;
    tasksDone: ITasks;
    tasksInProcess: ITasks;
    tasksOpened: ITasks;
    addTask: (newTask: ITask) => void;
    task: ITask;
    setTask: Dispatch<SetStateAction<ITask>>;
}

export const Board: FC<BoardProps> = props => {
    const {
        addBoard,
        editBoard,
        board,
        boards,
        currentBoard,
        setBoard,
        setBoards,
        setCurrentBoard,
        formOptions,
        setFormOptions,
        deleteBoard,
        setTasksDone,
        setTasksInProcess,
        setTasksOpened,
        tasks,
        tasksDone,
        tasksInProcess,
        tasksOpened,
        task,
        addTask,
        setTask,
    } = props;

    return (
        <div>
            {formOptions.isOpened ? (
                <Form
                    setTask={setTask}
                    task={task}
                    addTask={addTask}
                    deleteBoard={deleteBoard}
                    editBoard={editBoard}
                    setCurrentBoard={setCurrentBoard}
                    currentBoard={currentBoard}
                    setFormOptions={setFormOptions}
                    formOptions={formOptions}
                    board={board}
                    boards={boards}
                    addBoard={addBoard}
                    setBoard={setBoard}
                />
            ) : (
                <div className={styles.body}>
                    <BoardBar
                        setFormOptions={setFormOptions}
                        boards={boards}
                        currentBoard={currentBoard}
                        setBoards={setBoards}
                        setCurrentBoard={setCurrentBoard}
                        formOptions={formOptions}
                    />
                    <Tasks
                        setFormOptions={setFormOptions}
                        currentBoard={currentBoard}
                        setTasksDone={setTasksDone}
                        setTasksInProcess={setTasksInProcess}
                        setTasksOpened={setTasksOpened}
                        tasks={tasks}
                        tasksDone={tasksDone}
                        tasksInProcess={tasksInProcess}
                        tasksOpened={tasksOpened}
                    />
                </div>
            )}
        </div>
    );
};
