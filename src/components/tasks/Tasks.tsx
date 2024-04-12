import classNames from "classnames";
import { Dispatch, FC, SetStateAction } from "react";
import styles from "./Tasks.module.scss";
import {
    FormOptions,
    IBoard,
    ISetState,
    ITask,
    ITasks,
} from "../../types/types";
import { Button, ButtonType, ButtonVariant } from "../UI/button/Button";
import { Title } from "../title/Title";
import { List, ListVariant } from "../list/List";
import { Task } from "../task/Task";

interface TasksProps {
    // boards: IBoard[];
    tasks: Array<ITasks>;
    tasksOpened: ITasks;
    tasksInProcess: ITasks;
    tasksDone: ITasks;
    setTasksOpened: ISetState<ITasks>;
    setTasksInProcess: ISetState<ITasks>;
    setTasksDone: ISetState<ITasks>;
    currentBoard: IBoard;
    setFormOptions: Dispatch<SetStateAction<FormOptions>>;
    // setBoards: Dispatch<SetStateAction<IBoard[]>>;
}

export const Tasks: FC<TasksProps> = props => {
    const {
        setTasksDone,
        setTasksInProcess,
        setTasksOpened,
        tasks,
        tasksDone,
        tasksInProcess,
        tasksOpened,
        currentBoard,
        setFormOptions,
    } = props;

    return (
        <List
            variant={ListVariant.tasksArr}
            items={tasks}
            renderItem={(tasksItem: ITasks) => (
                <li className={styles.tasks} key={tasksItem.name}>
                    <header className={styles.title}>
                        <h3>{tasksItem.name}</h3>
                    </header>
                    <div className={styles.body}>
                        <List
                            variant={ListVariant.tasksItem}
                            items={tasksItem.tasks}
                            renderItem={(task: ITask) =>
                                task.boardName === currentBoard.name ? (
                                    <li key={task.id}>
                                        <Task
                                            setFormOptions={setFormOptions}
                                            id={task.id}
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
        // <ul className={styles.tasks}>
        //     <li className={styles.column}>
        //         <header>
        //             <h3>Opened</h3>
        //         </header>

        //         <section>tasks opened</section>
        //     </li>

        //     <li className={styles.column}>
        //         <header>
        //             <h3>In process</h3>
        //         </header>

        //         <section>tasks in process</section>
        //     </li>

        //     <li className={styles.column}>
        //         <header>
        //             <h3>Done</h3>
        //         </header>

        //         <section>tasks done</section>
        //     </li>
        // </ul>
    );
};
