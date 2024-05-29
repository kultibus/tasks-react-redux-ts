import { IDataVariant, IThemeVariant } from "../../../types/types";
import { updateLocalStorage } from "../../../utils/updateData";
import { AppDispatch, AppGetState } from "../../store";
import { setTheme } from "./themeSlice";

export const updateTheme =
    () => (dispatch: AppDispatch, getState: AppGetState) => {
        const { theme } = getState().themeReducer;

        const updatedTheme =
            theme === IThemeVariant.light
                ? IThemeVariant.dark
                : IThemeVariant.light;

        dispatch(setTheme(updatedTheme));

        updateLocalStorage<IThemeVariant>(updatedTheme, IDataVariant.theme);
    };

export const applyTheme = (theme: IThemeVariant) => (dispatch: AppDispatch) => {
    dispatch(setTheme(theme));
};
