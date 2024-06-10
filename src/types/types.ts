export enum IThemeVariant {
    dark = "dark",
    light = "light",
}

export interface IFilter {
    query: string;
    sort: string;
}

export interface ISelectOptions {
    value: string;
    name: string;
}
