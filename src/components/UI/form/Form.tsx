import {
    ChangeEventHandler,
    Dispatch,
    FC,
    FormEventHandler,
    SetStateAction,
} from "react";
import { IBoard } from "../../../types/types";
import { Button, ButtonType, ButtonVariant } from "../button/Button";
import { Input, InputType } from "../input/Input";
import styles from "./Form.module.scss";

export enum FormVariant {
    board = "board",
    firstBoard = "firstBoard",
}

interface FormProps {
    board: IBoard;
    boards: IBoard[];
    checkInputValidate: () => void;
    inputValidate: boolean;
    onSubmit: FormEventHandler<HTMLFormElement>;
    setBoardName: ChangeEventHandler<HTMLInputElement>;
    setInputValidate: Dispatch<SetStateAction<boolean>>;
    setIsFormOpened: Dispatch<SetStateAction<boolean>>;
    variant: FormVariant;
}

export const Form: FC<FormProps> = props => {
    const {
        board,
        checkInputValidate,
        inputValidate,
        onSubmit,
        setBoardName,
        setInputValidate,
        setIsFormOpened,
        variant,
    } = props;

    switch (variant) {
        case "firstBoard":
            return (
                <form onSubmit={onSubmit} className={styles.form}>
                    <Input
                        value={board.name}
                        placeholder="Board name?"
                        type={InputType.text}
                        onChange={setBoardName}
                        validate={inputValidate}
                        onClick={() => setInputValidate(true)}
                    />

                    <Button
                        onMouseDown={checkInputValidate}
                        type={ButtonType.submit}
                        variant={ButtonVariant.add}
                    >
                        Add board
                    </Button>
                </form>
            );

        case "board":
            return (
                <form onSubmit={onSubmit} className={styles.form}>
                    <Input
                        value={board.name}
                        placeholder="Board name?"
                        type={InputType.text}
                        onChange={setBoardName}
                        validate={inputValidate}
                        onClick={() => setInputValidate(true)}
                    />

                    <div className={styles.btns}>
                        <Button
                            onMouseDown={checkInputValidate}
                            type={ButtonType.submit}
                            variant={ButtonVariant.add}
                        >
                            Add board
                        </Button>

                        <Button
                            onClick={() => {
                                setIsFormOpened(false);
                                setInputValidate(true);
                            }}
                            type={ButtonType.button}
                            variant={ButtonVariant.add}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            );
    }
};
