import { FC, useState } from "react";
import styles, { dark } from "./App.module.scss";
import { Boards } from "./components/boards/Boards";
import { Header } from "./components/header/Header";
import { ITheme } from "./types/types";
import classNames from "classnames";

export enum ThemeVariant {
    light = "light",
    dark = "dark",
}

export const App: FC = () => {
    const [theme, setTheme] = useState<ITheme>({ variant: ThemeVariant.light });

    return (
        <div className={classNames(styles.theme, styles[theme.variant])}>
            <div className={styles.wrapper}>
                <Header theme={theme} setTheme={setTheme} />
                <Boards />
            </div>
        </div>
    );
};
