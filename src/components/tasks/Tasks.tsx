import { Dispatch, FC, SetStateAction } from "react";
import { FormOptions, IBoard, ITask, TaskType } from "../../types/types";
import { List, ListVariant } from "../list/List";
import { Task } from "../task/Task";
import styles from "./Tasks.module.scss";

interface TasksProps {
    currentBoard: IBoard;
    setFormOptions: Dispatch<SetStateAction<FormOptions>>;
    tasks: ITask[];
}

export const Tasks: FC<TasksProps> = props => {
    const { tasks, currentBoard, setFormOptions } = props;

    const tasksColumns: TaskType[] = ["Opened", "In process", "Done"];

    return (
        <List
            variant={ListVariant.tasksColumns}
            items={tasksColumns}
            renderItem={(tasksColumn: TaskType) => (
                <li className={styles.tasks} key={tasksColumn}>
                    <header className={styles.title}>
                        <h3>{tasksColumn}</h3>
                    </header>
                    <div className={styles.body}>
                        <List
                            variant={ListVariant.tasksItem}
                            items={tasks.filter(
                                task => task.type === tasksColumn
                            )}
                            renderItem={(task: ITask) =>
                                task.boardId === currentBoard.id ? (
                                    <li key={task.id}>
                                        <Task
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
