import { FC } from "react";
import DeleteIcon from "../../../assets/icons/delete.svg";
import EditIcon from "../../../assets/icons/edit.svg";
import { useAppSelector } from "../../../hooks/redux";
import { AppBtn, AppBtnVariant } from "../app-btn/AppBtn";
import styles from "./EditDelBtns.module.scss";
import classNames from "classnames";

export enum EditDelBtnsVariant {
    project = "projectBtns",
    task = "taskBtns",
}

interface EditDelBtnsProps {
    variant: EditDelBtnsVariant;
    handleDelBtn: () => void;
    handleEditBtn: () => void;
}

export const EditDelBtns: FC<EditDelBtnsProps> = props => {
    const { variant, handleDelBtn, handleEditBtn } = props;
    const { isOpened } = useAppSelector(state => state.formReducer);

    return (
        <div className={classNames(styles.btns, styles[variant])}>
            <AppBtn
                onClick={handleDelBtn}
                type="button"
                variant={AppBtnVariant.iconTopBar}
                disabled={isOpened ? true : false}
            >
                <DeleteIcon />
            </AppBtn>
            <AppBtn
                onClick={handleEditBtn}
                disabled={isOpened ? true : false}
                type="button"
                variant={AppBtnVariant.iconTopBar}
            >
                <EditIcon />
            </AppBtn>
        </div>
    );
};
