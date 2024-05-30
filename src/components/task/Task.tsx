import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import classNames from "classnames";
import { FC, useEffect, useState } from "react";
import DragIcon from "../../assets/icons/dragging.svg";
import { useAppDispatch } from "../../hooks/redux";
import {
    setFormVariant,
    setIsFormOpened,
} from "../../store/slices/form-slice/formSlice";
import { setActiveTask } from "../../store/slices/tasks-slice/tasksSlice";
import { IFormVariant } from "../../types/models/IForm";
import { ITask } from "../../types/models/ITask";
import { formatDate } from "../../utils/formatDate";
import { AppBtn, AppBtnVariant } from "../UI/app-btn/AppBtn";
import {
    EditDelBtns,
    EditDelBtnsVariant,
} from "../UI/edit-del-btns/EditDelBtns";
import styles from "./Task.module.scss";

interface TaskProps {
    task: ITask;
    isOverlay?: boolean;
}

export const Task: FC<TaskProps> = props => {
    const { task, isOverlay } = props;

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: task.id, data: { type: "task" } });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const dispatch = useAppDispatch();

    const [daysLeft, setDaysLeft] = useState<number>(
        formatDate.getDaysLeft(task.expDate)
    );

    useEffect(() => {
        setDaysLeft(formatDate.getDaysLeft(task.expDate));
    }, []);

    const handleTask = () => {
        dispatch(setActiveTask(task));
        dispatch(setIsFormOpened(true));
    };

    const handleDelTask = () => {
        handleTask();
        dispatch(setFormVariant(IFormVariant.deleteTask));
    };

    const handleEditTask = () => {
        handleTask();
        dispatch(setFormVariant(IFormVariant.editTask));
    };

    return (
        <li
            ref={setNodeRef}
            style={style}
            className={classNames(styles.task, {
                [styles.dragging]: isDragging,
            })}
        >
            <div className={styles.top}>
                <EditDelBtns
                    handleDelBtn={handleDelTask}
                    handleEditBtn={handleEditTask}
                    variant={EditDelBtnsVariant.task}
                />
                <div className={styles.title}>
                    <h3>{task.title}</h3>
                </div>
                <AppBtn
                    {...attributes}
                    {...listeners}
                    variant={AppBtnVariant.draggble}
                    isDragging={isOverlay}
                >
                    <DragIcon />
                </AppBtn>
            </div>
            {task.body && <p className={styles.body}>{task.body}</p>}
            <div className={styles.bottom}>
                <span>Days left to complete:</span>
                <span
                    className={classNames(styles.daysLeft, {
                        [styles.warning]: daysLeft < 7,
                        [styles.expires]: daysLeft < 3,
                    })}
                >
                    {daysLeft < 0 ? "0" : daysLeft}
                </span>
            </div>
        </li>
    );
};
