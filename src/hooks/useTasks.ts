import { useMemo } from "react";
import { ITask } from "../types/models/ITask";
import { IFilter } from "../types/types";

export const useTasks = (tasks: ITask[], { query, sort }: IFilter) => {
    const filteredTasks = useMemo(() => {
        return tasks.filter(t => t.title.toLowerCase().includes(query));
    }, [query, tasks]);

    return filteredTasks;
};
