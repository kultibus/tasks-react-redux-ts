import { IProject } from "./models/IProject";
import { ITask } from "./models/ITask";

export interface IProjectsData {
    currentProject: IProject;
    projects: IProject[];
}

export interface ITasksData {
    tasks: ITask[];
}

export interface IUpdateData {
    uid: string;
    data: IProjectsData | ITasksData;
}

// export interface IUpdateData<T> {
//     uid: string;
//     data: T;
// }
