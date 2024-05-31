import { DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import {
    setActiveTask,
    setTasks,
} from "../store/slices/tasks-slice/tasksSlice";
import { ITask } from "../types/models/ITask";
import { IDataVariant } from "../types/types";
import { updateDatabase, updateLocalStorage } from "../utils/updateData";
import { useAppDispatch, useAppSelector } from "./redux";
import { useState } from "react";

export const useDragAndDrop = (tasksState: ITask[], activeTaskState: ITask) => {
    const [tasks, setTasks] = useState<ITask[]>(tasksState);
    const [activeTask, setActiveTask] = useState<ITask | null>(activeTaskState);

    function handleDragStart(event: DragStartEvent) {
        if (event.active.data.current?.type === "task") {
            setActiveTask(event.active.data.current.task);
            return;
        }
    }

    function handleDragEnd() {
        setActiveTask(null);
    }

    function handleDragOver(event: DragOverEvent) {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        // const isActiveATask = active.data.current?.type === "task";
        const isOverATask = over.data.current?.type === "task";

        // if (!isActiveATask) return;

        // if (isActiveATask && isOverATask) {
        if (isOverATask) {
            setTasks(tasks => {
                const activeIndex = tasks.findIndex(t => t.id === activeId);
                const overIndex = tasks.findIndex(t => t.id === overId);

                if (tasks[activeIndex].board != tasks[overIndex].board) {
                    tasks[activeIndex].board = tasks[overIndex].board;
                    return arrayMove(tasks, activeIndex, overIndex - 1);
                }

                return arrayMove(tasks, activeIndex, overIndex);
            });
        }

        const isOverAColumn = over.data.current?.type === "board";

        // if (isActiveATask && isOverAColumn) {
        if (isOverAColumn) {
            setTasks(tasks => {
                const activeIndex = tasks.findIndex(t => t.id === activeId);

                tasks[activeIndex].board = overId as string;
                return arrayMove(tasks, activeIndex, activeIndex);
            });
        }
    }

    return {handleDragStart, handleDragEnd, handleDragOver};
};
