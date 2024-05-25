import { DataVariant } from "../api/api";
import { IProject } from "./models/IProject";
import { ITask } from "./models/ITask";

export interface IProjectsData {
    currentProject: IProject;
    projects: IProject[];
}

export type IBoards = ["opened", "inProcess", "done"];

// export interface ITasksData {
//     [key: string]: ITasks;
// }

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
