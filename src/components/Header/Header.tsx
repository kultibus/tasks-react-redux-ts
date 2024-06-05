import { FC } from "react";
import DarkModeIcon from "../../assets/icons/darkMode.svg";
import LightModeIcon from "../../assets/icons/lightMode.svg";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setTheme } from "../../store/slices/themeSlice";
import { IThemeVariant } from "../../types/types";
import { AppBtn, AppBtnVariant } from "../UI/app-btn/AppBtn";
import { HeaderLinks } from "../header-links/HeaderLinks";
import styles from "./Header.module.scss";

interface HeaderProps {}

export const Header: FC<HeaderProps> = props => {
    const { theme } = useAppSelector(state => state.themeReducer);

    const dispatch = useAppDispatch();

    const btnThemeHandler = () => {
        const updatedTheme =
            theme === IThemeVariant.light
                ? IThemeVariant.dark
                : IThemeVariant.light;

        localStorage.setItem("theme", updatedTheme);

        dispatch(setTheme(updatedTheme));
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
                        <div>{theme}</div>
                        {theme === IThemeVariant.dark ? (
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
