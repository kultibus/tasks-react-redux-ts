import { push, ref, remove, set, update } from "firebase/database";
import { database } from "../firebase";
import { IProject } from "../types/models/IProject";
import { ITask } from "../types/models/ITask";
import { IUser } from "../types/models/IUser";
import {
    IDataVariant,
    IProjectsData,
    ITaskData,
    IUpdatedData,
} from "../types/types";
import { useAppSelector } from "../hooks/redux";

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
            activeKey: task.id,
        };

        update(tasksRef, updates);
    };

    const deleteTask = (task: ITask) => {
        const tasksRef = ref(database, `${user.uid}/tasks/${task.id}`);

        remove(tasksRef);
    };

    return { addTask, editTask, deleteTask };
};

const updateData = <T extends {}>(localData: IUpdatedData<T>) => {
    return update(ref(database, `${localData.uid}`), localData.data);
};

export function updateDatabase(
    user: IUser,
    updatedData: IProject[] | ITask[],
    variant: IDataVariant
) {
    if (!user) return;

    switch (variant) {
        case IDataVariant.projects:
            const projectsData = {
                uid: user.uid,
                data: { [variant]: updatedData as IProject[] },
            };

            updateData<IProjectsData>(projectsData);
            break;

        case IDataVariant.tasks:
            const tasksData = {
                uid: user.uid,
                data: { [variant]: updatedData as ITask[] },
            };

            updateData<ITaskData>(tasksData);
            break;
    }
}
