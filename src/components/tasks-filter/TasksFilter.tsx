import { Dispatch, FC, SetStateAction, useState } from "react";
import { AppInput, AppInputVariant } from "../UI/app-input/AppInput";
import SortIcon from "../../assets/icons/sort.svg";
import FilterIcon from "../../assets/icons/filter.svg";
import styles from "./TasksFilter.module.scss";
import { ITask } from "../../types/models/ITask";
import { IFilter } from "../../types/types";
import { AppSelect } from "../UI/app-select/AppSelect";

interface TasksFilterProps {
    filter: IFilter;
    setFilter: Dispatch<SetStateAction<IFilter>>;
}

export const TasksFilter: FC<TasksFilterProps> = props => {
    const { filter, setFilter } = props;

    return (
        <div className={styles.cnt}>
            <div className={styles.filter}>
                <FilterIcon />
                <AppInput
                    variant={AppInputVariant.filter}
                    name="filter"
                    onChange={e => {
                        setFilter({ ...filter, query: e.target.value });
                    }}
                    placeholder="Filter tasks by title..."
                    type="text"
                />
            </div>
            <div className={styles.sort}>
                <SortIcon />

                <AppSelect
                    value={filter.sort}
                    onChange={e =>
                        setFilter({ ...filter, sort: e.target.value })
                    }
                    defaultValue="Sort tasks by..."
                    options={[
                        { value: "title", name: "Title" },
                        { value: "days", name: "Days left" },
                    ]}
                />
            </div>
        </div>
    );
};
