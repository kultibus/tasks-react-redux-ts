import { FC, useState } from "react";
import styles from "./App.module.scss";
import { Boards } from "./components/boards/Boards";
import { Header } from "./components/header/Header";
import { ITheme, ThemeVariant } from "./types/types";
import { switchAppTheme } from "./utils/switchAppTheme";

export const App: FC = () => {
    const [theme, setTheme] = useState<ITheme>({ variant: ThemeVariant.dark });

    return (
        <div className={styles.theme} data-theme={theme.variant}>
            <div className={styles.wrapper}>
                <Header
                    switchAppTheme={() => switchAppTheme(theme, setTheme)}
                    theme={theme}
                />
                <Boards />
            </div>
        </div>
    );
};
