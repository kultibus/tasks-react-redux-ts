import classNames from "classnames";
import { FC, TextareaHTMLAttributes } from "react";
import styles from "./AppTextarea.module.scss";

interface AppTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    // placeholderError: boolean;
}

export const AppTextarea: FC<AppTextareaProps> = props => {
    // const { placeholderError, ...rest } = props;

    return <textarea className={classNames(styles.textarea)} {...props} />;
};
