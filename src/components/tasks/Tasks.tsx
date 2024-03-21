import classNames from "classnames";
import { Dispatch, FC, SetStateAction } from "react";
import styles from "./Tasks.module.scss";
import { IBoard } from "../../types/types";
import { Button, ButtonType, ButtonVariant } from "../UI/button/Button";
import { Title } from "../title/Title";

interface TasksProps {
    // boards: IBoard[];
    // isFormOpened: boolean;
    // setBoards: Dispatch<SetStateAction<IBoard[]>>;
    // setIsFormOpened: Dispatch<SetStateAction<boolean>>;
}

export const Tasks: FC<TasksProps> = props => {
    const {} = props;

    return (
        <ul className={styles.tasks}>
            <li className={styles.tasks}>
                <header>
                    <h3>Opened</h3>
                    <div>quantity</div>
                </header>

                <section>tasks opened</section>
            </li>

            <li className={styles.tasks}>
                <header>
                    <h3>In process</h3>
                    <div>quantity</div>
                </header>

                <section>tasks in process</section>
            </li>

            <li className={styles.tasks}>
                <header>
                    <h3>Done</h3>
                    <div>quantity</div>
                </header>

                <section>tasks done</section>
            </li>
        </ul>
    );
};
