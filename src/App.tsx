import { FC, useState } from "react";
import styles from "./App.module.scss";
import { Boards } from "./components/boards/Boards";
import { Header } from "./components/header/Header";
import { ITheme } from "./types/types";

export enum Theme {
    light = "light",
    dark = "dark",
}

export const App: FC = () => {
    const [theme, setTheme] = useState<ITheme>({ variant: Theme.light });

    return (
        <div className={styles.theme} data-theme={theme.variant}>
            <div className={styles.wrapper}>
                <Header theme={theme} setTheme={setTheme} />
                <Boards />
            </div>
        </div>
    );
};
