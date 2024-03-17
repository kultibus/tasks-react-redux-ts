import { FC } from "react";
import styles from "./Board.module.scss";
import { BtnAdd } from "../UI/btn-add/Btn-add";
import { Tasks } from "../tasks/Tasks";

export const Board: FC = () => {
    return (
        <main className={styles.board}>
            <div className={styles.wrapper}>
                <section className={styles.header}>
                    <h2>Board</h2>
                    <BtnAdd>Add task</BtnAdd>
                </section>
                <Tasks/>
            </div>
        </main>
    );
};
