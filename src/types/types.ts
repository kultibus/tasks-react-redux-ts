import { IProject } from "./models/IProject";
import { ITask } from "./models/ITask";

export interface IProjectsData {
    currentProject: IProject;
    projects: IProject[];
}

export type ITaskStatus = "opened" | "inProcess" | "done";

export interface IProjectTasks {
    projectId: string;
    tasks: ITask[];
}

export interface ITasks {
    opened: IProjectTasks[];
    inProcess: IProjectTasks[];
    done: IProjectTasks[];
}

export interface ITasksData {
    [key: string]: ITasks;
}

export interface IUpdateData<T> {
    uid: string;
    data: T;
}

export type IResponseData = IProjectsData & ITasksData;
