import { Dispatch, SetStateAction } from "react";
import { ITheme, ThemeVariant } from "../types/types";

export const switchAppTheme = (
    theme: ITheme,
    setTheme: Dispatch<SetStateAction<ITheme>>
) => {
    if (theme.variant === "light") {
        setTheme({ ...theme, variant: ThemeVariant.dark });
    } else {
        setTheme({ ...theme, variant: ThemeVariant.light });
    }
};
