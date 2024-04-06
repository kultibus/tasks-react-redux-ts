import classNames from "classnames";
import { Dispatch, FC, SetStateAction } from "react";
import Delete from "../../assets/icons/delete.svg";
import Edit from "../../assets/icons/edit.svg";
import { FormAction, FormOptions, FormType, IBoard } from "../../types/types";
import { Button, ButtonType, ButtonVariant } from "../UI/button/Button";
import { Title } from "../title/Title";
import styles from "./BoardBar.module.scss";

interface BoardBarProps {
    boards: IBoard[];
    currentBoard: IBoard;
    setBoards: Dispatch<SetStateAction<IBoard[]>>;
    setCurrentBoard: Dispatch<SetStateAction<IBoard>>;
    formOptions: FormOptions;
    setFormOptions: Dispatch<SetStateAction<FormOptions>>;
}

export const BoardBar: FC<BoardBarProps> = props => {
    const {
        boards,
        currentBoard,
        setCurrentBoard,
        formOptions,
        setFormOptions,
    } = props;

    return (
        <header className={classNames(styles.boardBar)}>
            <div className={classNames(styles.body)}>
                <div className={styles.box}>
                    <Title>{currentBoard.name}</Title>

                    <div className={styles.btns}>
                        <Button
                            onClick={() =>
                                setFormOptions({
                                    action: "Edit",
                                    type: "Board",
                                    isOpened: true,
                                })
                            }
                            type={ButtonType.button}
                            variant={ButtonVariant.icon}
                        >
                            <Edit />
                        </Button>

                        <Button
                            onClick={() => setFormOptions({
								action: "Delete",
								type: "Board",
								isOpened: true,
							})}
                            type={ButtonType.button}
                            variant={ButtonVariant.icon}
                        >
                            <Delete />
                        </Button>
                    </div>
                </div>

                <Button type={ButtonType.button} variant={ButtonVariant.add}>
                    Add task
                </Button>
            </div>
        </header>
    );
};
