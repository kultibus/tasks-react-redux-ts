import { Dispatch, FC, SetStateAction } from "react";
import { Theme } from "../../App";
import DarkMode from "../../assets/icons/darkMode.svg";
import LightMode from "../../assets/icons/lightMode.svg";
import { ITheme } from "../../types/types";
import { Button, ButtonVariant } from "../UI/button/Button";
import styles from "./Header.module.scss";

interface HeaderProps {
    setTheme: Dispatch<SetStateAction<ITheme>>;
    theme: ITheme;
}

export const Header: FC<HeaderProps> = props => {
    const { setTheme, theme } = props;

    const darkModeHandler = () => {
        if (theme.variant === "light") {
            setTheme({ ...theme, variant: Theme.dark });
        } else {
            setTheme({ ...theme, variant: Theme.light });
        }
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <h1 className={styles.title}>Tasks manager</h1>
                <Button type={ButtonVariant.icon} onClick={darkModeHandler}>
                    {theme.variant === "light" ? <LightMode /> : <DarkMode />}
                </Button>
            </div>
        </header>
    );
};
