import { useMemo } from "react";
import { IProject } from "../types/models/IProject";
import { IDataVariant } from "../types/types";
import { useAppSelector } from "./redux";
import { updateDatabase } from "../api/api";

export const useProjects = () => {
    const { user } = useAppSelector(state => state.userReducer);
    const { projects } = useAppSelector(state => state.projectsReducer);
    const { tasks } = useAppSelector(state => state.tasksReducer);

    const activeProject = useMemo(() => {
        return projects.find(p => p.isActive);
    }, [projects]);

    const createProject = (project: IProject) => {
        const updatedProjects = projects.map(p => {
            return { ...p, isActive: false };
        });

        updatedProjects.push(project);

        updateDatabase(user, updatedProjects, IDataVariant.projects);
    };

    const deleteProject = (project: IProject) => {
        const activeIndex = projects.findIndex(p => p.id === project.id);

        const filteredProjects = projects.filter(p => p.id !== project.id);

        const filteredTasks = tasks.filter(t => t.projectId === project.id);

        if (projects.length > 1 && activeIndex === 0) {
            const nextProjectId = projects[activeIndex + 1].id;

            const updatedProjects = filteredProjects.map(p => {
                if (p.id === nextProjectId) {
                    return { ...p, isActive: true };
                }
                return { ...p, isActive: false };
            });

            updateDatabase(user, updatedProjects, IDataVariant.projects);
            updateDatabase(user, filteredTasks, IDataVariant.tasks);

            return nextProjectId;
        } else if (projects.length > 1) {
            const pervProjectId = projects[activeIndex - 1].id;

            const updatedProjects = filteredProjects.map(p => {
                if (p.id === pervProjectId) {
                    return { ...p, isActive: true };
                }
                return { ...p, isActive: false };
            });

            updateDatabase(user, updatedProjects, IDataVariant.projects);
            updateDatabase(user, filteredTasks, IDataVariant.tasks);

            return pervProjectId;
        } else {
            updateDatabase(user, null, IDataVariant.projects);
            updateDatabase(user, null, IDataVariant.tasks);

            return null;
        }
    };

    const updateProjects = (project: IProject) => {
        const updatedProjects = projects.map(p => {
            if (p.id === project.id) {
                return { ...project, isActive: true };
            }
            return { ...p, isActive: false };
        });

        updateDatabase(user, updatedProjects, IDataVariant.projects);
    };

    return {
        activeProject,
        createProject,
        deleteProject,
        updateProjects,
    };
};
