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

// export type InputValid = boolean;

export type ISetState<T> = Dispatch<SetStateAction<T>>;

export type FormType = "Board" | "Task";

export type FormAction = "Add" | "Edit" | "Delete";

export interface FormOptions {
    action: FormAction;
    type: FormType;
	isOpened: boolean
}
