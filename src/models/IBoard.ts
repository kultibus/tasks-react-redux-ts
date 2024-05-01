import { ITaskState } from "./ITask";

export interface IBoard {
    name: ITaskState;
    current?: boolean;
}
