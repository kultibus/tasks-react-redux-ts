import { FC, useState } from "react";
import { AppInput, AppInputVariant } from "../UI/app-input/AppInput";
import SortIcon from "../../assets/icons/sort.svg";
import FilterIcon from "../../assets/icons/filter.svg";
import styles from "./TasksFilter.module.scss";
import { ITask } from "../../types/models/ITask";

interface TasksFilterProps {
    tasks: ITask[];
}

export const TasksFilter: FC<TasksFilterProps> = props => {
    const { tasks } = props;

    const [value, setValue] = useState<string>("");

    return (
        <div className={styles.cnt}>
            <div className={styles.filter}>
                <AppInput
                    variant={AppInputVariant.filter}
                    name="filter"
                    onChange={e => {
                        setValue(e.target.value);
                    }}
                    onBlur={() => setValue("")}
                    placeholder={"Filter tasks"}
                    type="text"
                    value={value}
                />
                <div>
                    <FilterIcon />
                </div>
            </div>
            <div className={styles.filter}>hello</div>
        </div>
    );
};
