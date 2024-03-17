import { FC } from "react";
import { Container, ContainerDirection } from "../container/Container";
import styles from "./Header.module.scss";
import { BtnAdd } from "../UI/btn-add/Btn-add";

export const Header: FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <h1 className={styles.title}>Tasks manager</h1>
				<BtnAdd>Add board</BtnAdd>
            </div>
        </header>
    );
};
