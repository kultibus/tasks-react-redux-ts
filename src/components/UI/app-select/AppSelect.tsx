import { FC, ReactNode, SelectHTMLAttributes } from "react";
import { ISelectOptions } from "../../../types/types";
import styles from "./AppSelect.module.scss";
import SortIcon from "../../../assets/icons/sort.svg";

interface AppSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    options: ISelectOptions[];
    label: string;
}

export const AppSelect: FC<AppSelectProps> = props => {
    const { options, label, ...restProps } = props;

    return (
        <div className={styles.cnt}>
            <SortIcon />

            <div className={styles.label}>
                <label htmlFor="tasks-sort">{label}</label>
            </div>

            <select id="tasks-sort" className={styles.select} {...restProps}>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
};
