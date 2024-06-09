import { useMemo } from "react";
import { ITask } from "../types/models/ITask";
import { IFilter } from "../types/types";

// export const useProjectTasks = () => {
//     const { tasks } = useAppSelector(state => state.tasksReducer);
//     const { activeProject } = useAppSelector(state => state.projectsReducer);

//     const projectTasks = useMemo(() => {
//         return tasks.filter(t => t.projectId === activeProject.id);
//     }, [tasks, activeProject]);

//     return projectTasks;
// };

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
    // const projectTasks = useProjectTasks();

    const sortedTasks = useSortedTasks(tasks, sort);

    const sortedAndFilteredTasks = useMemo(() => {
        return sortedTasks?.filter(t => t.title.toLowerCase().includes(query));
    }, [query, sortedTasks]);


    return sortedAndFilteredTasks || [];
};

// export const useTasks = () => {
//     const { user } = useAppSelector(state => state.userReducer);
//     const { tasks } = useAppSelector(state => state.tasksReducer);

//     const createTask = (newTask: ITask) => {
//         const updatedTasks = [...tasks, newTask];

//         updateDatabase(user, updatedTasks, IDataVariant.tasks);
//     };

//     const deleteTask = (task: ITask) => {
//         const updatedTasks = tasks.filter(t => t.id !== task.id);

//         updateDatabase(user, updatedTasks, IDataVariant.tasks);
//     };

//     const editTask = (task: ITask) => {
//         const updatedTasks = tasks.map(t => {
//             if (t.id === task.id) {
//                 return task;
//             }
//             return t;
//         });

//         updateDatabase(user, updatedTasks, IDataVariant.tasks);
//     };

//     const updateTasks = (tasks: ITask[]) => {
//         updateDatabase(user, tasks, IDataVariant.tasks);
//     };

//     return { createTask, editTask, deleteTask, updateTasks };
// };
