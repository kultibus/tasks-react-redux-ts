import classNames from "classnames";
import { Dispatch, FC, SetStateAction } from "react";
import { IBoard } from "../../types/types";
import { Title } from "../title/Title";
import { Button, ButtonType, ButtonVariant } from "../UI/button/Button";
import styles from "./BoardBar.module.scss";

interface BoardBarProps {
    boards: IBoard[];
    isFormOpened: boolean;
    setBoards: Dispatch<SetStateAction<IBoard[]>>;
    setIsFormOpened: Dispatch<SetStateAction<boolean>>;
}

export const BoardBar: FC<BoardBarProps> = props => {
    const { boards, isFormOpened } = props;

    return (
        <header className={classNames(styles.boardBar)}>
            {isFormOpened ? (
                <Title>Add board</Title>
            ) : (
                <div className={classNames(styles.body)}>
                    <Title>{boards.find(board => board.current).name}</Title>
                    <Button
                        type={ButtonType.button}
                        variant={ButtonVariant.add}
                    >
                        Add task
                    </Button>
                </div>
            )}
        </header>
    );
};
