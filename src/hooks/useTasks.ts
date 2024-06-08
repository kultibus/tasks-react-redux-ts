import { useCallback, useMemo } from "react";
import { ITask } from "../types/models/ITask";
import { IDataVariant, IFilter } from "../types/types";
import { useAppSelector } from "./redux";
import { useProjects } from "./useProjects";
import { updateDatabase } from "../api/api";

export const useProjectTasks = () => {
    const { tasks } = useAppSelector(state => state.tasksReducer);
    const { activeProject } = useProjects();

    const projectTasks = useMemo(() => {
        return tasks.filter(t => t.projectId === activeProject.id);
    }, [tasks, activeProject]);

    return projectTasks;
};

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

export const useSortedAndFilteredTasks = ({ query, sort }: IFilter) => {
    const projectTasks = useProjectTasks();

    const sortedTasks = useSortedTasks(projectTasks, sort);

    const sortedAndFilteredTasks = useMemo(() => {
        return sortedTasks.filter(t => t.title.toLowerCase().includes(query));
    }, [query, sortedTasks]);

    return sortedAndFilteredTasks;
};

export const useTasks = () => {
    const { user } = useAppSelector(state => state.userReducer);
    const { tasks } = useAppSelector(state => state.tasksReducer);

    const createTask = (newTask: ITask) => {
        const updatedTasks = [...tasks, newTask];

        updateDatabase(user, updatedTasks, IDataVariant.tasks);
    };

    const deleteTask = (task: ITask) => {
        const updatedTasks = tasks.filter(t => t.id !== task.id);

        updateDatabase(user, updatedTasks, IDataVariant.tasks);
    };

    const editTask = (task: ITask) => {
        const updatedTasks = tasks.map(t => {
            if (t.id === task.id) {
                return task;
            }
            return t;
        });

        updateDatabase(user, updatedTasks, IDataVariant.tasks);
    };

    const updateTasks = useCallback((tasks: ITask[]) => {
        updateDatabase(user, tasks, IDataVariant.tasks);
    }, [tasks]);

    return { createTask, editTask, deleteTask, updateTasks };
};
