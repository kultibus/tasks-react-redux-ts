import classNames from "classnames";
import { Dispatch, FC, SetStateAction } from "react";
import { IBoard } from "../../types/types";
import { Title } from "../title/Title";
import { Button, ButtonType, ButtonVariant } from "../UI/button/Button";
import styles from "./BoardBar.module.scss";
import Edit from "../../assets/icons/edit.svg";
import Delete from "../../assets/icons/delete.svg";

interface BoardBarProps {
    boards: IBoard[];
    currentBoard: IBoard;
    isFormOpened: boolean;
    setIsFormOpened: Dispatch<SetStateAction<boolean>>;
    setBoards: Dispatch<SetStateAction<IBoard[]>>;
    setCurrentBoard: Dispatch<SetStateAction<IBoard>>;
    setIsFormOpened: Dispatch<SetStateAction<boolean>>;
}

export const BoardBar: FC<BoardBarProps> = props => {
    const {
        boards,
        isFormOpened,
        currentBoard,
        setCurrentBoard,
        setIsFormOpened,
    } = props;

    const clickHandler = () => {
        setIsFormOpened(true);
    };

    return (
        <header className={classNames(styles.boardBar)}>
            {isFormOpened ? (
                <Title>Add board</Title>
            ) : (
                <div className={classNames(styles.body)}>
                    <div className={styles.box}>
                        <Title>{currentBoard.name}</Title>

                        <div className={styles.btns}>
                            <Button
                                onClick={setIsFormOpened}
                                type={ButtonType.button}
                                variant={ButtonVariant.icon}
                            >
                                <Edit />
                            </Button>

                            <Button
                                onClick={setIsFormOpened}
                                type={ButtonType.button}
                                variant={ButtonVariant.icon}
                            >
                                <Delete />
                            </Button>
                        </div>
                    </div>

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
