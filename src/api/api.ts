import { push, ref, remove, set, update } from "firebase/database";
import { database } from "../firebase";
import { IProject } from "../types/models/IProject";
import { ITask } from "../types/models/ITask";
import { IUser } from "../types/models/IUser";

export const projectsDatabaseApi = (user: IUser) => {
    const addProject = (project: IProject) => {
        const projectsRef = ref(database, `${user.uid}/projects`);

        const newProjectKey = push(projectsRef).key;

        const updates = {
            [newProjectKey]: project,
            activeKey: newProjectKey,
        };

        update(projectsRef, updates);
    };

    const editProject = (project: IProject) => {
        const projectRef = ref(database, `${user.uid}/projects/${project.id}`);

        update(projectRef, project);
    };

    const deleteProject = (project: IProject) => {
        const projectRef = ref(database, `${user.uid}/projects/${project.id}`);
        const tasksRef = ref(database, `${user.uid}/tasks/${project.id}`);

        remove(projectRef);
        remove(tasksRef);
    };

    const updateActiveKey = (project: IProject) => {
        const activeKeyRef = ref(database, `${user.uid}/projects/activeKey`);

        if (!!project.id) {
            set(activeKeyRef, project.id);
        } else {
            remove(activeKeyRef);
        }
    };

    return { addProject, editProject, deleteProject, updateActiveKey };
};

export const tasksDatabaseApi = (user: IUser, projectId: string) => {
    const addTask = (task: ITask) => {
        const tasksRef = ref(database, `${user.uid}/tasks/${projectId}`);

        const newTaskRef = push(tasksRef);

        set(newTaskRef, task);
    };

    const editTask = (task: ITask) => {
        const tasksRef = ref(database, `${user.uid}/tasks/${projectId}`);

        const updates = {
            [task.id]: task,
        };

        update(tasksRef, updates);
    };

    const deleteTask = (task: ITask) => {
        const tasksRef = ref(
            database,
            `${user.uid}/tasks/${projectId}/${task.id}`
        );

        remove(tasksRef);
    };

    return { addTask, editTask, deleteTask };
};
