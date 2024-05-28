import { IProject } from "./models/IProject";
import { ITask } from "./models/ITask";

export type IUpdateTasksAction = "update" | "delete";

export enum DataVariant {
    user = "userData",
    projects = "projects",
    tasks = "tasks",
}

export interface IProjectsData {
    projects: IProject[];
}

export interface ITaskData {
    tasks: ITask[];
}

export interface IUpdatedData<T> {
    uid: string;
    data: T;
}
