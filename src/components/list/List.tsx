import { FC } from "react";
import { IBoard } from "../../types/types";
import { Button, ButtonType, ButtonVariant } from "../UI/button/Button";
import styles from "./List.module.scss";

export enum ListVariant {
    boards = "boards",
}

interface ListProps {
    boards: IBoard[];
    variant: ListVariant;
}

export const List: FC<ListProps> = props => {
    const { boards, variant } = props;

    return (
        <ul className={styles[variant]}>
            {boards.map(board => (
                <li key={board.id}>
                    <Button
                        type={ButtonType.button}
                        variant={
                            board.current
                                ? ButtonVariant.active
                                : ButtonVariant.list
                        }
                    >
                        {board.name}
                    </Button>
                </li>
            ))}
        </ul>
    );
};
