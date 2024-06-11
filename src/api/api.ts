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

export const tasksDatabaseApi = (
    user: IUser,
    projectId: string,
    tasks: ITask[]
) => {
    const addTask = (task: ITask) => {
        const tasksRef = ref(database, `${user.uid}/tasks/${projectId}`);

        const updatedTasks = !!tasks ? [...tasks, task] : [task];

        set(tasksRef, updatedTasks);
    };

    const editTask = (task: ITask) => {
        const tasksRef = ref(database, `${user.uid}/tasks`);

        const updatedTasks = tasks.map(t => {
            if (t.id === task.id) {
                return task;
            }
            return t;
        });

        const updates = {
            [projectId]: updatedTasks,
        };

        update(tasksRef, updates);
    };

    const deleteTask = (task: ITask) => {
        const tasksRef = ref(database, `${user.uid}/tasks`);

        const updatedTasks = tasks.filter(t => t.id !== task.id);

        const updates = {
            [projectId]: updatedTasks,
        };

        update(tasksRef, updates);
    };

    const updateTasks = (reorderedTasks: ITask[], editedTask: ITask | null) => {
        const tasksRef = ref(database, `${user.uid}/tasks`);

        const updatedTasks = !!editedTask
            ? reorderedTasks.map(t => {
                  if (t.id === editedTask.id) {
                      return editedTask;
                  }
                  return t;
              })
            : reorderedTasks;

        const updates = {
            [projectId]: updatedTasks,
        };

        update(tasksRef, updates);
    };

    return { addTask, editTask, deleteTask, updateTasks };
};
