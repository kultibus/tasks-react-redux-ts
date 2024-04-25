import { FC, ReactNode } from "react";
import styles from "./List.module.scss";

export enum ListVariant {
    boards = "boards",
	tasks = 'tasks'
}

interface ListProps<T> {
    variant: ListVariant;
    items: T[];
    renderItem: (item: T) => ReactNode;
}

export function List<T>(props: ListProps<T>) {
    const { variant } = props;

    return (
        <ul className={styles[variant]}>{props.items.map(props.renderItem)}</ul>
    );
}
