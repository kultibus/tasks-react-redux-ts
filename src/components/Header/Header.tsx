import { FC, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { RouteNames, addSlash } from "../../router";
import styles from "./Header.module.scss";
import { BtnVariant, Button } from "../UI/buttons/Button";
import { signout } from "../../store/slices/authSlice/actionCreators";
import { HeaderLinks } from "../header-links/HeaderLinks";
import DarkModeIcon from "../../assets/icons/darkMode.svg";
import LightModeIcon from "../../assets/icons/lightMode.svg";
import classNames from "classnames";
import { auth } from "../../firebase";

interface HeaderProps {}

export const Header: FC<HeaderProps> = props => {
    const [themeVariant, setThemeVariant] = useState<string>("Dark");

    const { isAuth, user } = useAppSelector(state => state.authReducer);

    const dispatch = useAppDispatch();

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
                <h1 className={styles.title}>Tasks manager</h1>

                {isAuth ? (
                    <HeaderLinks>
                        <div className={styles.hi}>Hi, {user.login}!</div>
                        <Button
                            variant={BtnVariant.header}
                            type="button"
                            onClick={() => dispatch(signout())}
                        >
                            Sign out
                        </Button>
                    </HeaderLinks>
                ) : (
                    <HeaderLinks>
                        <NavLink to={addSlash(RouteNames.login)}>
                            {({ isActive }) => (
                                <Button
                                    variant={
                                        isActive
                                            ? BtnVariant.headerAcive
                                            : BtnVariant.header
                                    }
                                >
                                    {RouteNames.login}
                                </Button>
                            )}
                        </NavLink>
                        <NavLink to={addSlash(RouteNames.register)}>
                            {({ isActive }) => (
                                <Button
                                    variant={
                                        isActive
                                            ? BtnVariant.headerAcive
                                            : BtnVariant.header
                                    }
                                >
                                    {RouteNames.register}
                                </Button>
                            )}
                        </NavLink>
                    </HeaderLinks>
                )}
                <div className={styles.btnCnt}>
                    <Button onClick={btnThemeHandler} variant={BtnVariant.icon}>
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
