import { Dispatch, FC, SetStateAction } from "react";
import { ThemeVariant } from "../../App";
import DarkMode from "../../assets/icons/darkMode.svg";
import LightMode from "../../assets/icons/lightMode.svg";
import { ITheme } from "../../types/types";
import { Button, ButtonType, ButtonVariant } from "../UI/button/Button";
import styles from "./Header.module.scss";

interface HeaderProps {
    setTheme: Dispatch<SetStateAction<ITheme>>;
    theme: ITheme;
}

export const Header: FC<HeaderProps> = props => {
    const { setTheme, theme } = props;

    const darkModeHandler = () => {
        if (theme.variant === "light") {
            setTheme({ ...theme, variant: ThemeVariant.dark });
        } else {
            setTheme({ ...theme, variant: ThemeVariant.light });
        }
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <h1 className={styles.title}>Tasks manager</h1>
                <Button
                    onClick={darkModeHandler}
                    variant={ButtonVariant.icon}
                    type={ButtonType.button}
                >
                    {theme.variant === "light" ? <LightMode /> : <DarkMode />}
                </Button>
            </div>
        </header>
    );
};
