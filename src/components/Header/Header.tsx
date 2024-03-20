import { FC } from "react";
import DarkMode from "../../assets/icons/darkMode.svg";
import LightMode from "../../assets/icons/lightMode.svg";
import { ITheme } from "../../types/types";
import { Button, ButtonType, ButtonVariant } from "../UI/button/Button";
import styles from "./Header.module.scss";

interface HeaderProps {
    theme: ITheme;
    switchAppTheme: () => void;
}

export const Header: FC<HeaderProps> = props => {
    const { theme, switchAppTheme } = props;

    return (
        <header className={styles.header}>
            <h1 className={styles.title}>Tasks manager</h1>
            <Button
                onClick={switchAppTheme}
                variant={ButtonVariant.icon}
                type={ButtonType.button}
            >
                {theme.variant === "light" ? <LightMode /> : <DarkMode />}
            </Button>
        </header>
    );
};
