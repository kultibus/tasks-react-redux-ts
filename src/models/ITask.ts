export enum ITaskState {
    opened = "opened",
    done = "done",
    inProcess = "in process",
}

export interface ITask {
    id: string;
    title: string;
    body: string;
    // expDate: Date;
    expDate: number;
    state: ITaskState;
}
