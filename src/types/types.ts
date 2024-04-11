import { Dispatch, SetStateAction } from "react";

export enum ThemeVariant {
    light = "light",
    dark = "dark",
}

export interface ITheme {
    variant: ThemeVariant;
}

export interface IBoard {
    id: number;
    name: string;
    tasks?: ITasks[];
}

export interface ITask {
    id: number;
    name: string;
    description: string;
    boardName?: string;
}

export interface ITasks {
    name: string;
    tasks: ITask[];
}

// export interface ITasksArr {
//     id: string;
//     tasks: ITasks[];
// }

// export type InputValid = boolean;

export type ISetState<T> = Dispatch<SetStateAction<T>>;

export type FormType = "Board" | "Task";

export type FormAction = "Add" | "Edit" | "Delete";

export interface FormOptions {
    action: FormAction;
    type: FormType;
    isOpened: boolean;
}
