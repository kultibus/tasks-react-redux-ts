
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
    current: boolean;
}

export type InputValidate = boolean;
