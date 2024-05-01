import { IForm, IFormVariant } from "../../../models/IForm";
import { AppDispatch } from "../../store";
import { formProjectSlice } from "./formProjectsSlice";

export const toggleProjectsForm =
    ({ isOpened, variant }: IForm) =>
    (dispatch: AppDispatch) => {
        dispatch(formProjectSlice.actions.setIsOpened(isOpened));

        if (isOpened) {
            dispatch(formProjectSlice.actions.setVariant(variant));
        } else {
            dispatch(formProjectSlice.actions.setVariant(IFormVariant.initial));
        }
    };

export const setIsValidProjectsForm =
    ({ isValid }: IForm) =>
    (dispatch: AppDispatch) => {
        dispatch(formProjectSlice.actions.setIsValid(isValid));
    };
