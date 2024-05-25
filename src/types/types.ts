import { DataVariant } from "../api/api";
import { IProject } from "./models/IProject";
import { ITask } from "./models/ITask";

export type IUpdateTasksAction = "update" | "delete";

export interface IProjectsData {
    currentProject: IProject;
    projects: IProject[];
}

export interface IProjectTasks {
    projectId: string;
    tasks: ITask[];
}

export interface ITasks {
    opened: IProjectTasks[];
    inProcess: IProjectTasks[];
    done: IProjectTasks[];
}

export interface IUpdateData<T> {
    uid: string;
    path: DataVariant;
    data: T;
}
