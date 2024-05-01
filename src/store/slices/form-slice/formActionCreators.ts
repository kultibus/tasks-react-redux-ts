import { IForm, IFormVariant } from "../../../models/IForm";
import { AppDispatch } from "../../store";
import { formSlice } from "./formSlice";

const { setIsOpened, setIsValid, setVariant } = formSlice.actions;

export const toggleForm =
    ({ isOpened, variant }: IForm) =>
    (dispatch: AppDispatch) => {
        dispatch(setIsOpened(isOpened));

        if (isOpened) {
            dispatch(setVariant(variant));
        } else {
            dispatch(setVariant(IFormVariant.initial));
        }
    };

export const setIsValidForm =
    ({ isValid }: IForm) =>
    (dispatch: AppDispatch) => {
        dispatch(setIsValid(isValid));
    };
