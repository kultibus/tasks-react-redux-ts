import { FC } from "react";
import { Button, ButtonType, ButtonVariant } from "../button/Button";
import styles from "./Form.module.scss";

interface FormBottomProps {
    checkValidate: () => void;
    cancel: () => void;
}

export const FormBottom: FC<FormBottomProps> = props => {
    return (
        <div className={styles.formBottom}>
            <Button
                onMouseDown={props.checkValidate}
                type={ButtonType.submit}
                variant={ButtonVariant.add}
            >
                Add board
            </Button>
            <Button
                onClick={props.cancel}
                type={ButtonType.button}
                variant={ButtonVariant.add}
            >
                Cancel
            </Button>
        </div>
    );
};
