export enum ITaskState {
    opened = "opened",
    done = "done",
    inProcess = "in process",
}

export interface ITask {
    id: string;
    state: ITaskState;
    projectId: string;
    title: string;
    body: string;
    expDate: number;
}
