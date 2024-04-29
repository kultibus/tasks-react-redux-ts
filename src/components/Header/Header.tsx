import { FC, useState } from "react";
import DarkModeIcon from "../../assets/icons/darkMode.svg";
import LightModeIcon from "../../assets/icons/lightMode.svg";
import { BtnVariant, Button } from "../UI/buttons/Button";
import { HeaderLinks } from "../header-links/HeaderLinks";
import styles from "./Header.module.scss";

interface HeaderProps {}

export const Header: FC<HeaderProps> = props => {
    const [themeVariant, setThemeVariant] = useState<string>("Dark");

    const btnThemeHandler = () => {
        if (themeVariant === "Light") {
            setThemeVariant("Dark");
        } else {
            setThemeVariant("Light");
        }
    };

    return (
        <header className={styles.header}>
            <div className={styles.cnt}>
                <h1 className={styles.title}>Task manager</h1>

                <HeaderLinks />

                <div className={styles.btnCnt}>
                    <Button
                        type="button"
                        onClick={btnThemeHandler}
                        variant={BtnVariant.icon}
                    >
                        <div>{themeVariant}</div>
                        {themeVariant === "Dark" ? (
                            <DarkModeIcon />
                        ) : (
                            <LightModeIcon />
                        )}
                    </Button>
                </div>
            </div>
        </header>
    );
};
