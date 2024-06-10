import { useMemo } from "react";
import { ITask } from "../types/models/ITask";
import { IFilter } from "../types/types";

export const useSortedTasks = (tasks: ITask[], sort: string) => {
    const sortedTasks = useMemo(() => {
        if (sort === "default") {
            return tasks;
        }

        if (sort === "expDate") {
            return [...tasks].sort((a, b) => a[sort] - b[sort]);
        }

        if (sort === "title") {
            return [...tasks].sort((a, b) => a[sort].localeCompare(b[sort]));
        }

        return tasks;
    }, [sort, tasks]);

    return sortedTasks;
};

export const useSortedAndFilteredTasks = (
    { query, sort }: IFilter,
    tasks: ITask[]
) => {
    const sortedTasks = useSortedTasks(tasks, sort);

    const sortedAndFilteredTasks = useMemo(() => {
        return sortedTasks?.filter(t => t.title.toLowerCase().includes(query));
    }, [query, sortedTasks]);

    return sortedAndFilteredTasks || [];
};
