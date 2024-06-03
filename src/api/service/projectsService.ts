import { useAppSelector } from "../../hooks/redux";
import { IProject } from "../../types/models/IProject";
import { databaseApi } from "../api";

export const useProjects = () => {
	const { user } = useAppSelector(state => state.userReducer);
	// const { projects } = useAppSelector(state => state.projectsReducer);

    const createProject = (project: IProject) => {

        // const updatedProjects = projects.map(p => {
        //     return { ...p, isActive: false };
        // });

        // updatedProjects.push(project);

        const projectData = {
            uid: user.uid,
            project: project,
        };

        databaseApi.addProject(projectData);
    };

    return { createProject };
};

export const deleteProject = (project: IProject) => {
    const { user } = useAppSelector(state => state.userReducer);
    const { projects } = useAppSelector(state => state.projectsReducer);

    const updatedProjects = projects.filter(p => p.id !== project.id) || null;

    const projectsData = {
        uid: user.uid,
        data: {
            projects: updatedProjects,
        },
    };

    databaseApi.updateProjects(projectsData);
};

export const updateProjects = (project: IProject) => {
    const { user } = useAppSelector(state => state.userReducer);
    const { projects } = useAppSelector(state => state.projectsReducer);

    const updatedProjects = projects.map(p => {
        if (p.id === project.id) {
            return { ...project, isActive: true };
        }
        return { ...p, isActive: false };
    });

    const projectsData = {
        uid: user.uid,
        data: {
            projects: updatedProjects,
        },
    };

    databaseApi.updateProjects(projectsData);
};
