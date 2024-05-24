import { IProject } from "./models/IProject";
import { ITask } from "./models/ITask";

export interface IProjectsData {
    currentProject: IProject;
    projects: IProject[];
}

export type ITaskStatus = "opened" | "inProcess" | "done";

export type ITasks = {
    opened: ITask[];
    inProcess: ITask[];
    done: ITask[];
};

export interface ITasksData {
    [key: string]: ITasks;
}

export interface IProjectTasks {
    projectId: string;
    tasks: ITask[];
}

export interface IUpdateData<T> {
    uid: string;
    data: T;
}

export type IResponseData = IProjectsData & ITasksData;
