export enum ITaskState {
    opened = "Opened",
    done = "Done",
    inProcess = "In Process",
}

export interface ITask {
    body: string;
    id: string;
    // uid: string;
    name: string;
    current?: boolean;
    state: ITaskState;
}
