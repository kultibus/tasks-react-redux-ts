import { FC, SelectHTMLAttributes } from "react";
import { ISelectOptions } from "../../../types/types";
import styles from "./AppSelect.module.scss";

interface AppSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    options: ISelectOptions[];
}

export const AppSelect: FC<AppSelectProps> = props => {
    const { options } = props;

    return (
        <select className={styles.select} {...props}>
            <option disabled value="">
                Sort tasks by...
            </option>
            <option value="title">Title</option>
            <option value="days">Days left</option>
        </select>
    );
};
