import { Dispatch, FC, SetStateAction } from "react";
import styles from "./Header.module.scss";
import { BtnAdd } from "../UI/btn-add/Btn-add";
import { ITheme } from "../../types/types";
import { ThemeVariant } from "../../App";
// import LightMode from '../../assets/icons/lightMode.svg'
// import DarkMode from '../../assets/icons/darkMode.svg'

interface HeaderProps {
    setTheme: Dispatch<SetStateAction<ITheme>>;
    theme: ITheme;
}

export const Header: FC<HeaderProps> = props => {
    const { setTheme, theme } = props;

    const clickHandler = () => {
        if (theme.variant === 'light') {
            setTheme({ ...theme, variant: ThemeVariant.dark });
        } else {
            setTheme({ ...theme, variant: ThemeVariant.light });
        }
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <h1 className={styles.title}>Tasks manager</h1>
                <button onClick={clickHandler} type="button">
                    {theme.variant}
                </button>
                {/* <BtnAdd>Add board</BtnAdd> */}
            </div>
        </header>
    );
};
