export enum IBoardName {
    opened = "opened",
    done = "done",
    inProcess = "in process",
}

export interface IBoard {
    name: IBoardName;
}
