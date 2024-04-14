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
}

export type TaskStatus = "Opened" | "In process" | "Done";

export type TaskAction = "Edit" | "Delete" | "Move" | "Add";

export interface ITask {
    id: number;
    name: string;
    description: string;
    status: TaskStatus;
    boardId: number;
    action: TaskAction;
}



export type ISetState<T> = Dispatch<SetStateAction<T>>;

export type FormType = "Board" | "Task";

export type FormAction = "Add" | "Edit" | "Delete";

export interface FormOptions {
    action: FormAction;
    type: FormType;
    isOpened: boolean;
}
