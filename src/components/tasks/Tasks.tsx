import { Dispatch, FC, SetStateAction } from "react";
import { FormOptions, IBoard, ITask, TaskStatus } from "../../types/types";
import { List, ListVariant } from "../list/List";
import { Task } from "../task/Task";
import styles from "./Tasks.module.scss";

interface TasksProps {
    currentBoard: IBoard;
    setFormOptions: Dispatch<SetStateAction<FormOptions>>;
    tasks: ITask[];
    setTasks: Dispatch<SetStateAction<ITask[]>>;
    setCurrentTask: Dispatch<SetStateAction<ITask>>;
}

export const Tasks: FC<TasksProps> = props => {
    const { tasks, currentBoard, setFormOptions, setTasks, setCurrentTask } =
        props;

    const tasksStatus: TaskStatus[] = ["Opened", "In process", "Done"];

    return (
        <List
            variant={ListVariant.tasksColumns}
            items={tasksStatus}
            renderItem={(tasksColumn: TaskStatus) => (
                <li className={styles.tasks} key={tasksColumn}>
                    <header className={styles.title}>
                        <h3>{tasksColumn}</h3>
                    </header>
                    <div className={styles.body}>
                        <List
                            variant={ListVariant.tasksItem}
                            items={tasks.filter(
                                task => task.status === tasksColumn
                            )}
                            renderItem={(task: ITask) =>
                                task.boardId === currentBoard.id ? (
                                    <li key={task.id}>
                                        <Task
                                            setCurrentTask={setCurrentTask}
                                            tasks={tasks}
                                            setTasks={setTasks}
                                            id={task.id}
                                            setFormOptions={setFormOptions}
                                            name={task.name}
                                            description={task.description}
                                        />
                                    </li>
                                ) : null
                            }
                        />
                    </div>
                </li>
            )}
        />
    );
};
