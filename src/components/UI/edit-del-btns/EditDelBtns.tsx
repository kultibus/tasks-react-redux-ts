import classNames from "classnames";
import { FC, MouseEvent, ReactNode } from "react";
import DeleteIcon from "../../../assets/icons/delete.svg";
import EditIcon from "../../../assets/icons/edit.svg";
import { useAppSelector } from "../../../hooks/redux";
import { AppBtn, AppBtnVariant } from "../app-btn/AppBtn";
import styles from "./EditDelBtns.module.scss";

export enum EditDelBtnsVariant {
    project = "projectBtns",
    task = "taskBtns",
}

interface EditDelBtnsProps {
    variant: EditDelBtnsVariant;
    handleDelBtn: (e: MouseEvent<HTMLButtonElement>) => void;
    handleEditBtn: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const EditDelBtns: FC<EditDelBtnsProps> = props => {
    const { variant, handleDelBtn, handleEditBtn } = props;
    const { isOpened } = useAppSelector(state => state.formReducer);

    return (
        <div className={classNames(styles.btns, styles[variant])}>
            <AppBtn
                onClick={handleDelBtn}
                type="button"
                variant={
                    variant === EditDelBtnsVariant.project
                        ? AppBtnVariant.topBar
                        : AppBtnVariant.task
                }
                disabled={isOpened ? true : false}
            >
                <DeleteIcon />
            </AppBtn>
            <AppBtn
                onClick={handleEditBtn}
                disabled={isOpened ? true : false}
                type="button"
                variant={
                    variant === EditDelBtnsVariant.project
                        ? AppBtnVariant.topBar
                        : AppBtnVariant.task
                }
            >
                <EditIcon />
            </AppBtn>
        </div>
    );
};
