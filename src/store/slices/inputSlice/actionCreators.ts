import { AppDispatch } from "../../store";
import { inputSlice } from "./inputSlice";

export const inputAction = () => (dispatch: AppDispatch) => {
    dispatch(inputSlice.actions.setInput());
};
