import { IProject } from "./models/IProject";
import { ITask } from "./models/ITask";

export enum IThemeVariant {
    dark = "dark",
    light = "light",
}
export enum IDataVariant {
    user = "userData",
    projects = "projects",
    tasks = "tasks",
    theme = "theme",
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

export interface IFilter {
    query: string;
    sort: string;
}

export interface ISelectOptions {
    value: string;
    name: string;
}
