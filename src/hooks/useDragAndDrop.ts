import { DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { setActiveTask, setTasks } from "../store/slices/tasksSlice";
import { ITask } from "../types/models/ITask";
import { IDataVariant } from "../types/types";
import { updateDatabase, updateLocalStorage } from "../utils/updateData";
import { useAppDispatch, useAppSelector } from "./redux";

export const useDragAndDrop = () => {
    const { tasks } = useAppSelector(state => state.tasksReducer);
    const { user } = useAppSelector(state => state.userReducer);

    const dispatch = useAppDispatch();

    const [currentTasks, setCurrentTasks] = useState<ITask[] | null>(tasks);

    useEffect(() => {
        setCurrentTasks(tasks);
    }, [tasks]);

    useEffect(() => {
        dispatch(setTasks(currentTasks));

        updateDatabase(user, currentTasks, IDataVariant.tasks);

        updateLocalStorage<ITask[]>(currentTasks, IDataVariant.tasks);
    }, [currentTasks]);

    const handleDragStart = (event: DragStartEvent) => {
        dispatch(setActiveTask(event.active.data.current.task));
    };

    const handleDragEnd = () => {
        dispatch(setActiveTask(null));
    };

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id as string;
        const overId = over.id as string;

        const isOverTask = over.data.current?.type === "task";

        const oldBoard = active.data.current?.board;
        const newBoard = over.data.current?.board;

        const oldIndex = currentTasks.findIndex(t => t.id === activeId);
        const newIndex = currentTasks.findIndex(t => t.id === overId);

        if (isOverTask) {
            if (oldBoard === newBoard) {
                setCurrentTasks(tasks => {
                    return arrayMove(tasks, oldIndex, newIndex);
                });
            } else if (activeId === overId) {
                setCurrentTasks(tasks => {
                    const updatedTasks = tasks.map(t => {
                        if (t.id === activeId) {
                            return { ...t, board: newBoard };
                        }
                        return t;
                    });
                    return arrayMove(updatedTasks, oldIndex, oldIndex);
                });
            } else if (oldIndex < newIndex) {
                setCurrentTasks(tasks => {
                    const updatedTasks = tasks.map(t => {
                        if (t.id === activeId) {
                            return { ...t, board: newBoard };
                        }
                        return t;
                    });
                    return arrayMove(updatedTasks, oldIndex, newIndex - 1);
                });
            } else {
                setCurrentTasks(tasks => {
                    const updatedTasks = tasks.map(t => {
                        if (t.id === activeId) {
                            return { ...t, board: newBoard };
                        }
                        return t;
                    });
                    return arrayMove(updatedTasks, oldIndex, newIndex);
                });
            }
        } else {
            const overBoard = currentTasks.filter(t => t.board === overId);

            if (oldBoard === newBoard) {
                setCurrentTasks(tasks => {
                    return arrayMove(tasks, oldIndex, oldIndex);
                });
            } else if (overBoard.length) {
                const overBoardLastIndex = currentTasks.findIndex(
                    t => t.id === overBoard[overBoard.length - 1].id
                );

                setCurrentTasks(tasks => {
                    const updatedTasks = tasks.map(t => {
                        if (t.id === activeId) {
                            return { ...t, board: overId };
                        }
                        return t;
                    });
                    return arrayMove(
                        updatedTasks,
                        oldIndex,
                        overBoardLastIndex + 1
                    );
                });
            } else {
                setCurrentTasks(tasks => {
                    const updatedTasks = tasks.map(t => {
                        if (t.id === activeId) {
                            return { ...t, board: overId };
                        }
                        return t;
                    });
                    return arrayMove(updatedTasks, oldIndex, oldIndex);
                });
            }
        }
    };

    return { handleDragStart, handleDragEnd, handleDragOver };
};
