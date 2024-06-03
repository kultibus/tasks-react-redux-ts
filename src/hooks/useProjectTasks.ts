import { useMemo } from "react";
import { useAppSelector } from "./redux";
import { IProject } from "../types/models/IProject";
import { useActiveProject } from "./useProjects";

export const useProjectTasks = () => {
    const { tasks } = useAppSelector(state => state.tasksReducer);
    const activeProject = useActiveProject();

    const projectTasks = useMemo(() => {
        return tasks.filter(t => t.projectId === activeProject.id);
    }, [tasks, activeProject]);

    return projectTasks;
};
