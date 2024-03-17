import { FC } from "react";
import styles from './App.module.scss';
import { Board } from "./components/board/Board";
import { Header } from "./components/header/Header";

export const App: FC = () => {
    return (
        <div className={styles.wrapper}>
            <Header />
            <Board />
        </div>
    );
};
