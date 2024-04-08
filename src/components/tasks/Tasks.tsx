import classNames from "classnames";
import { Dispatch, FC, SetStateAction } from "react";
import styles from "./Tasks.module.scss";
import { IBoard, ISetState, ITask, ITasks, ITasksArr } from "../../types/types";
import { Button, ButtonType, ButtonVariant } from "../UI/button/Button";
import { Title } from "../title/Title";
import { List, ListVariant } from "../list/List";

interface TasksProps {
    // boards: IBoard[];
    tasksArr: ITasksArr;
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
        tasksArr,
        tasksDone,
        tasksInProcess,
        tasksOpened,
    } = props;

    return (
        <List
            variant={ListVariant.tasks}
            items={tasksArr.tasks}
            renderItem={(tasks: ITasks) => (
                <li key={tasks.id}>
                    <header>
                        <h3>{tasks.id}</h3>
                    </header>
                    <List
                        variant={ListVariant.task}
                        items={tasks.tasks}
                        renderItem={(task: ITask) => <div>{task.title}</div>}
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
