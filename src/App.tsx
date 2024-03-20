import { FC, useState } from "react";
import styles from "./App.module.scss";
import { Boards } from "./components/boards/Boards";
import { Header } from "./components/header/Header";
import { ITheme, ThemeVariant } from "./types/types";
import classNames from "classnames";

export const App: FC = () => {
    const [theme, setTheme] = useState<ITheme>({ variant: ThemeVariant.dark });

    const darkModeHandler = () => {
        if (theme.variant === "light") {
            setTheme({ ...theme, variant: ThemeVariant.dark });
        } else {
            setTheme({ ...theme, variant: ThemeVariant.light });
        }
    };

    return (
        <div
            className={classNames(styles.wrapper, styles.theme)}
            data-theme={theme.variant}
        >
            <Header darkModeHandler={darkModeHandler} theme={theme} />
            <Boards />
        </div>
    );
};
