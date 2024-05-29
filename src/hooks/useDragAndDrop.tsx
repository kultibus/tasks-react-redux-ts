import { DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";
import {
    setActiveTask,
    setTasks,
} from "../store/slices/tasks-slice/tasksSlice";
import { ITask } from "../types/models/ITask";
import { IDataVariant } from "../types/types";
import { updateDatabase, updateLocalStorage } from "../utils/updateData";
import { useAppDispatch, useAppSelector } from "./redux";

export const useDragAndDrop = () => {
    const { tasks } = useAppSelector(state => state.tasksReducer);
    const { user } = useAppSelector(state => state.userReducer);

    const dispatch = useAppDispatch();

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;

        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isOverATask = over.data.current?.type === "task";
        const isOverABoard = over.data.current?.type === "board";

        const activeIndex = tasks.findIndex(t => t.id === activeId);
        const overIndex = tasks.findIndex(t => t.id === overId);

        if (isOverATask) {
            if (tasks[activeIndex].board === tasks[overIndex].board) {
                const updatedTasks = arrayMove(tasks, activeIndex, overIndex);

                dispatch(setTasks(updatedTasks));

                return;
            }

            console.log(activeIndex, overIndex);

            const updatedTasks = arrayMove(tasks, activeIndex, overIndex).map(
                t => {
                    if (t.id === activeId) {
                        return { ...t, board: tasks[overIndex].board };
                    }
                    return t;
                }
            );

            dispatch(setTasks(updatedTasks));

            return;
        }

        if (isOverABoard) {
            const updatedTasks = arrayMove(tasks, activeIndex, activeIndex).map(
                t => {
                    if (t.id === activeId) {
                        return { ...t, board: overId as string };
                    }
                    return t;
                }
            );

            dispatch(setTasks(updatedTasks));

            return;
        }
    };

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;

        const draggbleTask = tasks.find(t => t.id === active.id);

        dispatch(setActiveTask(draggbleTask));
    };

    const handleDragEnd = () => {
        updateDatabase(user, tasks, IDataVariant.tasks);

        updateLocalStorage<ITask[]>(tasks, IDataVariant.tasks);

        dispatch(setActiveTask(null));
    };

    return { handleDragOver, handleDragStart, handleDragEnd };
};

// export const useDragAndDrop = () => {
//     const { tasks } = useAppSelector(state => state.tasksReducer);
//     const { user } = useAppSelector(state => state.userReducer);

//     const dispatch = useAppDispatch();

//     const handleDragOver = (event: DragOverEvent) => {
//         const { active, over } = event;

//         if (!over) return;

//         const activeId = active.id;
//         const overId = over.id;

//         if (activeId === overId) return;

//         const isOverATask = over.data.current?.type === "task";
//         const isOverABoard = over.data.current?.type === "board";

//         const activeIndex = tasks.findIndex(t => t.id === activeId);
//         const overIndex = tasks.findIndex(t => t.id === overId);

//         if (isOverATask) {
//             if (tasks[activeIndex].board === tasks[overIndex].board) {
//                 const updatedTasks = arrayMove(tasks, activeIndex, overIndex);

//                 dispatch(setTasks(updatedTasks));

//                 return;
//             }

//             const updatedTasks = arrayMove(tasks, activeIndex, overIndex).map(
//                 t => {
//                     if (t.id === activeId) {
//                         return { ...t, board: tasks[overIndex].board };
//                     }
//                     return t;
//                 }
//             );

//             dispatch(setTasks(updatedTasks));

//             return;
//         }

//         if (isOverABoard) {
//             const updatedTasks = arrayMove(tasks, activeIndex, activeIndex).map(
//                 t => {
//                     if (t.id === activeId) {
//                         return { ...t, board: overId as string };
//                     }
//                     return t;
//                 }
//             );

//             dispatch(setTasks(updatedTasks));

//             return;
//         }
//     };

//     const handleDragStart = (event: DragStartEvent) => {
//         const { active } = event;

//         const draggbleTask = tasks.find(t => t.id === active.id);

//         dispatch(setActiveTask(draggbleTask));
//     };

//     const handleDragEnd = () => {
//         updateDatabase(user, tasks, IDataVariant.tasks);

//         updateLocalStorage<ITask[]>(tasks, IDataVariant.tasks);

//         dispatch(setActiveTask(null));
//     };

//     return { handleDragOver, handleDragStart, handleDragEnd };
// };
