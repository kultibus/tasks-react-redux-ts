import { useMemo } from "react";
import { useAppSelector } from "./redux";
import { IProject } from "../types/models/IProject";

export const useProjectTasks = (activeProject: IProject) => {
    const { tasks } = useAppSelector(state => state.tasksReducer);

    const projectTasks = useMemo(() => {
        return tasks.filter(t => t.projectId === activeProject.id);
    }, [tasks, activeProject]);

    return projectTasks;
};
