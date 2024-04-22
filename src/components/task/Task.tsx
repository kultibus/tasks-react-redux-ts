import { Dispatch, FC, SetStateAction } from "react";
import { FormOptions, ITask } from "../../types/types";
import styles, { task } from "./Task.module.scss";
import { Button, ButtonType, ButtonVariant } from "../UI/buttons/ButtonSubmit";
import Delete from "../../assets/icons/delete.svg";
import Edit from "../../assets/icons/edit.svg";

interface TaskProps {
    name: string;
    description: string;
    setFormOptions: Dispatch<SetStateAction<FormOptions>>;
    setTasks: Dispatch<SetStateAction<ITask[]>>;
    setCurrentTask: Dispatch<SetStateAction<ITask>>;
    tasks: ITask[];
    id: number;
}

export const Task: FC<TaskProps> = props => {
    const {
        name,
        description,
        setFormOptions,
        setTasks,
        tasks,
        id,
        setCurrentTask,
    } = props;

    return (
        <div className={styles.task}>
            <header className={styles.header}>
                <h4 className={styles.title}>{name}</h4>
                <div className={styles.btns}>
                    <Button
                        onClick={() => {
                            setTasks([
                                ...tasks.map(task => {
                                    if (task.id === id) {
                                        task.action = "Edit";
                                    } else {
                                        task.action = "Add";
                                    }
                                    return task;
                                }),
                            ]);
                            setFormOptions({
                                action: "Edit",
                                type: "Task",
                                isOpened: true,
                            });
                        }}
                        type={ButtonType.button}
                        variant={ButtonVariant.icon}
                    >
                        <Edit />
                    </Button>

                    <Button
                        onClick={() => {
                            setTasks([
                                ...tasks.map(task => {
                                    if (task.id === id) {
                                        task.action = "Delete";
                                    } else {
                                        task.action = "Add";
                                    }
                                    return task;
                                }),
                            ]);
                            setFormOptions({
                                action: "Delete",
                                type: "Task",
                                isOpened: true,
                            });
                        }}
                        type={ButtonType.button}
                        variant={ButtonVariant.icon}
                    >
                        <Delete />
                    </Button>
                </div>
            </header>
            <p>{description}</p>
            <div className={styles.bottom}>
                <div className={styles.bottomLeft}>Days Left:</div>
                <div className={styles.bottomRight}>10</div>
            </div>
        </div>
    );
};
