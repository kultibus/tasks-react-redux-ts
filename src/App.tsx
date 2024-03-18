import { FC, useState } from "react";
import styles from "./App.module.scss";
import { Boards } from "./components/boards/Boards";
import { Header } from "./components/header/Header";
import classNames from "classnames";

export const App: FC = () => {
    const [theme, setTheme] = useState({ text: "light" });

    return (
        <div className={styles[theme.text]}>
            <div className={styles.wrapper}>
                <Header theme={theme} setTheme={setTheme} />
                <Boards />
            </div>
        </div>
    );
};
