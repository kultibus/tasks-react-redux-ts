import { FC, ReactNode } from "react";
import styles from "./List.module.scss";

export enum ListVariant {
    boards = "boards",
    tasks = "tasks",
    task = "task",
}

interface ListProps<T> {
    variant: ListVariant;
    items: T[];
    renderItem: (item: T) => ReactNode;
}

export function List<T>(props: ListProps<T>) {
    return (
        <ul className={styles[props.variant]}>
            {props.items.map(props.renderItem)}
        </ul>
    );
}
