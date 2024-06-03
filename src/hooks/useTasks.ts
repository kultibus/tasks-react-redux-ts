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

export const useTasks = (tasks: ITask[], { query, sort }: IFilter) => {
    const sortedTasks = useSortedTasks(tasks, sort);

    const filteredTasks = useMemo(() => {
        return sortedTasks.filter(t => t.title.toLowerCase().includes(query));
    }, [query, sortedTasks]);

    return filteredTasks;
};
