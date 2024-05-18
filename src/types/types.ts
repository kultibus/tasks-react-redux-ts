import { IProject } from "./models/IProject";
import { ITask } from "./models/ITask";

export interface IProjectsData {
    currentProject: IProject;
    projects: IProject[];
}

export interface ITasksData {
    openedTasks?: ITask[];
    inProcessTasks?: ITask[];
    doneTasks?: ITask[];
}

export interface IUpdateData<T> {
    uid: string;
    data: T;
}
