import classNames from "classnames";
import { Dispatch, FC, SetStateAction } from "react";
import styles from "./Tasks.module.scss";
import { IBoard, ISetState, ITask, ITasks } from "../../types/types";
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
    } = props;

    return (
        <List
            variant={ListVariant.tasksArr}
            items={tasks}
            renderItem={(tasks: ITasks) => (
                <li key={tasks.name}>
                    <header>
                        <h3>{tasks.name}</h3>
                    </header>
                    <List
                        variant={ListVariant.tasks}
                        items={tasks.tasks}
                        renderItem={(task: ITask) => (
                            <li key={task.id}>
                                <Task
                                    id={task.id}
                                    title={task.title}
                                    description={task.description}
                                />
                            </li>
                        )}
                    />
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
