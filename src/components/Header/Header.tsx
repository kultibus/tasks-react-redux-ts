import { Dispatch, FC, SetStateAction } from "react";
import styles from "./Header.module.scss";
import { BtnAdd } from "../UI/btn-add/Btn-add";

interface HeaderProps {
    setTheme: Dispatch<SetStateAction<{ text: string }>>;
    theme: {
        text: string;
    };
}

export const Header: FC<HeaderProps> = props => {
    const { setTheme, theme } = props;

    const clickHandler = () => {
        if (theme.text === "light") {
            setTheme({ ...theme, text: "dark" });
        } else {
            setTheme({ ...theme, text: "light" });
        }
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <h1 className={styles.title}>Tasks manager</h1>
                <button onClick={clickHandler} type="button">
                    {theme.text}
                </button>
                {/* <BtnAdd>Add board</BtnAdd> */}
            </div>
        </header>
    );
};
