export enum ITaskState {
    opened = "Opened",
    done = "Done",
    inProcess = "In Process",
}

export interface ITask {
    id: string;
    title: string;
    body: string;
    state: ITaskState;
}
