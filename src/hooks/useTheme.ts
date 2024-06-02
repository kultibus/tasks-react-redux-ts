import { useEffect } from "react";
import { localStorageApi } from "../api/api";
import { applyTheme } from "../store/slices/theme-slice/themeActionCreators";
import { IDataVariant, IThemeVariant } from "../types/types";
import { useAppDispatch, useAppSelector } from "./redux";

export const useTheme = () => {
    const { theme } = useAppSelector(state => state.themeReducer);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const html = document.querySelector("html");

        const localTheme = localStorageApi.getLocalData<IThemeVariant>(
            IDataVariant.theme
        );

        if (!!localTheme) {
            html.setAttribute("data-theme", localTheme);

            dispatch(applyTheme(localTheme));
            return;
        }

        html.setAttribute("data-theme", theme);
    }, [theme, dispatch]);
};
