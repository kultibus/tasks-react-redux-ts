import { Dispatch, FC, SetStateAction } from "react";
import { IBoard } from "../../../types/types";
import { Title } from "../../title/Title";
import { Button, ButtonType, ButtonVariant } from "../button/Button";
import styles from "./BoardsBar.module.scss";

interface BoardsBarProps {
    boards: IBoard[];
    isFormOpened: boolean;
    setIsFormOpened: Dispatch<SetStateAction<boolean>>;
}

export const BoardsBar: FC<BoardsBarProps> = props => {
    const { boards, isFormOpened, setIsFormOpened } = props;

    return (
        <aside className={styles.boardsBar}>
            <Title>Boards</Title>
            <ul className={styles.boardsList}>
                {boards.map(board => (
                    <li key={board.id}>
                        <Button
                            type={ButtonType.button}
                            variant={ButtonVariant.add}
                        >
                            {board.name}
                        </Button>
                    </li>
                ))}
            </ul>
            {!isFormOpened && (
                <Button
                    onClick={() => setIsFormOpened(true)}
                    type={ButtonType.button}
                    variant={ButtonVariant.add}
                >
                    Add board
                </Button>
            )}
        </aside>
    );
};
