import { FC, useState } from "react";
import { BtnAdd } from "../UI/btn-add/Btn-add";
import styles from "./Boards.module.scss";
import classNames from "classnames";

export const Boards: FC = () => {
    const [board, setBoard] = useState({ title: "", body: "" });
    const [boards, setBoards] = useState([]);

    return (
        <div className={styles.boards}>
            <h2 className={classNames(styles.header, styles.headerLeft)}>
                Boards
            </h2>
            <header>
                <h2 className={classNames(styles.header, styles.headerFormTitle)}>
                    Create board
                </h2>
            </header>
            <aside className={styles.menu}>
                <div>Boards lists</div>
                <div>Boards lists</div>
                <div>Boards lists</div>
            </aside>

            <main className={styles.main}>
                <form className={styles.form}>
                    <input placeholder="Board name?" type="text" />
                    <BtnAdd>Add board</BtnAdd>
                </form>
            </main>
        </div>
    );
};
