import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import { setTheme } from "../store/slices/themeSlice";
import { IThemeVariant } from "../types/types";

export const useTheme = () => {
    const { theme } = useAppSelector(state => state.themeReducer);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const html = document.querySelector("html");

        const localTheme = localStorage.getItem("theme");

        if (!!localTheme) {
            dispatch(setTheme(localTheme as IThemeVariant));

            html.setAttribute("data-theme", localTheme);
        } else {
            html.setAttribute("data-theme", theme);
        }
    }, [theme, dispatch]);
};
