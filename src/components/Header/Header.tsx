import { FC } from "react";
import styles from "./Header.module.scss";
import { Container } from "../Container/Container";

export const Header: FC = () => {
    return (
        <header className={styles.header}>
            <Container>
                <div className={styles.container}>
                    <h1 className={styles.title}>Tasks manager</h1>
                </div>
            </Container>
        </header>
    );
};
