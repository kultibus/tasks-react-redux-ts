import { useMemo } from "react";
import { useAppSelector } from "./redux";
import { IProject } from "../types/models/IProject";
import { updateDatabase } from "../utils/updateData";
import { IDataVariant } from "../types/types";

export const useProjects = () => {
    const { user } = useAppSelector(state => state.userReducer);
    const { projects } = useAppSelector(state => state.projectsReducer);

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
        const updatedProjects =
            projects.filter(p => p.id !== project.id) || null;

        updateDatabase(user, updatedProjects, IDataVariant.projects);
    };

    const updateProjects = (project: IProject) => {
        const updatedProjects = !!project
            ? projects.map(p => {
                  if (p.id === project.id) {
                      return { ...project, isActive: true };
                  }
                  return { ...p, isActive: false };
              })
            : [];

        updateDatabase(user, updatedProjects, IDataVariant.projects);
    };

    return { activeProject, createProject, deleteProject, updateProjects };
};
