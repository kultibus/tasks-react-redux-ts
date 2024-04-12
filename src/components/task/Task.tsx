import { Dispatch, FC, SetStateAction } from "react";
import { FormOptions, ITask } from "../../types/types";
import styles from "./Task.module.scss";
import { Button, ButtonType, ButtonVariant } from "../UI/button/Button";
import Delete from "../../assets/icons/delete.svg";
import Edit from "../../assets/icons/edit.svg";

interface TaskProps extends ITask {
    setFormOptions: Dispatch<SetStateAction<FormOptions>>;
}

export const Task: FC<TaskProps> = props => {
    const { name, description, setFormOptions } = props;

    return (
        <div className={styles.task}>
            <header className={styles.header}>
                <h4 className={styles.title}>{name}</h4>
                <div className={styles.btns}>
                    <Button
                        onClick={() =>
                            setFormOptions({
                                action: "Delete",
                                type: "Task",
                                isOpened: true,
                            })
                        }
                        type={ButtonType.button}
                        variant={ButtonVariant.icon}
                    >
                        <Edit />
                    </Button>

                    <Button
                        onClick={() =>
                            setFormOptions({
                                action: "Delete",
                                type: "Task",
                                isOpened: true,
                            })
                        }
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
