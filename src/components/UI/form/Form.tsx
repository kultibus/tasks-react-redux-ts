import { Dispatch, FC, FormEventHandler, SetStateAction } from "react";
import { IBoard } from "../../../types/types";
import { Button, ButtonType, ButtonVariant } from "../button/Button";
import { Input, InputType } from "../input/Input";
import styles from "./Form.module.scss";

export enum FormVariant {
    actual = "actual",
    initial = "initial",
}

interface FormProps {
    board: IBoard;
    boards: IBoard[];
    checkInputValidate: () => void;
    inputValidate: boolean;
    onSubmit: FormEventHandler<HTMLFormElement>;
    setBoard: Dispatch<SetStateAction<IBoard>>;
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
        setBoard,
        setInputValidate,
        setIsFormOpened,
        variant,
    } = props;

    switch (variant) {
        case "initial":
            return (
                <form onSubmit={onSubmit} className={styles.form}>
                    <Input
                        value={board.name}
                        placeholder="Board name?"
                        type={InputType.text}
                        onChange={e =>
                            setBoard({ ...board, name: e.target.value })
                        }
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

        case "actual":
            return (
                <form onSubmit={onSubmit} className={styles.form}>
                    <Input
                        value={board.name}
                        placeholder="Board name?"
                        type={InputType.text}
                        onChange={e =>
                            setBoard({ ...board, name: e.target.value })
                        }
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
                                setBoard({
                                    id: null,
                                    name: "",
                                    current: false,
                                });
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
