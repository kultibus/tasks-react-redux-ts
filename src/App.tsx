import { FC } from "react";
import styles from './App.module.scss';
import { Header } from "./components/header/Header";
import { Board } from "./components/board/Board";
import { Container } from "./components/container/Container";

export const App: FC = () => {
    return (
        <div className={styles.wrapper}>
            <Header />
            <Board />
        </div>
    );
};
