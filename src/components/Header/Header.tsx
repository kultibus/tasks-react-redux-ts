import { FC, useState } from "react";
import DarkModeIcon from "../../assets/icons/darkMode.svg";
import LightModeIcon from "../../assets/icons/lightMode.svg";
import { HeaderLinks } from "../header-links/HeaderLinks";
import styles from "./Header.module.scss";
import { AppBtn, AppBtnVariant } from "../UI/app-btn/AppBtn";

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
                    <AppBtn
                        type="button"
                        onClick={btnThemeHandler}
                        variant={AppBtnVariant.icon}
                    >
                        <div>{themeVariant}</div>
                        {themeVariant === "Dark" ? (
                            <DarkModeIcon />
                        ) : (
                            <LightModeIcon />
                        )}
                    </AppBtn>
                </div>
            </div>
        </header>
    );
};
