import { DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { setActiveTask, setTasks } from "../store/slices/tasksSlice";
import { useAppDispatch, useAppSelector } from "./redux";
import { useTasks } from "./useTasks";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ITask } from "../types/models/ITask";
import { updateDatabase } from "../api/api";
import { IDataVariant } from "../types/types";

export const useDragAndDrop = () => {
    const { tasks, activeTask } = useAppSelector(state => state.tasksReducer);
    // const { user } = useAppSelector(state => state.userReducer);

    const { updateTasks } = useTasks();

    const dispatch = useAppDispatch();

    const [currentTasks, setCurrentTasks] = useState<ITask[]>(tasks);


    useEffect(() => {
        dispatch(setTasks(currentTasks));
    }, [dispatch, currentTasks]);

    const handleDragStart = (event: DragStartEvent) => {
        dispatch(setActiveTask(event.active.data.current.task));
    };

    const handleDragEnd = () => {
        dispatch(setActiveTask(null));
        // updateTasks(currentTasks);
    };

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id as string;
        const overId = over.id as string;

        if (activeId === overId) return;

        const isOverTask = over.data.current?.type === "task";

        const oldIndex = currentTasks.findIndex(t => t.id === activeId);
        const newIndex = currentTasks.findIndex(t => t.id === overId);

        const oldBoard = active.data.current?.board;
        const newBoard = over.data.current?.board;

        if (isOverTask) {
            if (oldBoard !== newBoard && newIndex !== 0) {
                setCurrentTasks(tasks => {
                    const updatedTasks = tasks.map(t => {
                        if (t.id === activeId) {
                            return {
                                ...activeTask,
                                board: newBoard,
                            };
                        } else {
                            return t;
                        }
                    });

                    return arrayMove(updatedTasks, oldIndex, newIndex - 1);
                });
            } else if (oldBoard !== newBoard && newIndex === 0) {
                setCurrentTasks(tasks => {
                    const updatedTasks = tasks.map(t => {
                        if (t.id === activeId) {
                            return {
                                ...activeTask,
                                board: newBoard,
                            };
                        } else {
                            return t;
                        }
                    });

                    return arrayMove(updatedTasks, oldIndex, newIndex);
                });
            } else {
                setCurrentTasks(tasks => {
                    return arrayMove(tasks, oldIndex, newIndex);
                });
            }
        } else {
            setCurrentTasks(tasks => {
                const updatedTasks = tasks.map(t => {
                    if (t.id === activeId) {
                        return {
                            ...activeTask,
                            board: overId,
                        };
                    } else {
                        return t;
                    }
                });

                return arrayMove(updatedTasks, oldIndex, newIndex);
            });
        }
    };

    return { handleDragStart, handleDragEnd, handleDragOver };
};

// export const useDragAndDrop = () => {
//     const { tasks, activeTask } = useAppSelector(state => state.tasksReducer);

//     const { updateTasks } = useTasks();

//     const dispatch = useAppDispatch();

//     const [currentTasks, setCurrentTasks] = useState<ITask[] | null>(null);

//     useEffect(() => {
//         setCurrentTasks(tasks);
//     }, [tasks]);

//     useEffect(() => {
//         if (!!currentTasks && currentTasks.length) {
//             updateTasks(currentTasks);
//         }
//     }, [currentTasks]);

//     const handleDragStart = (event: DragStartEvent) => {
//         dispatch(setActiveTask(event.active.data.current.task));
//     };

//     const handleDragEnd = () => {
//         dispatch(setActiveTask(null));
//     };

//     const handleDragOver = (event: DragOverEvent) => {
//         const { active, over } = event;
//         if (!over) return;

//         const activeId = active.id as string;
//         const overId = over.id as string;

//         if (activeId === overId) return;

//         const isOverTask = over.data.current?.type === "task";

//         const oldIndex = currentTasks.findIndex(t => t.id === activeId);
//         const newIndex = currentTasks.findIndex(t => t.id === overId);

//         const oldBoard = active.data.current?.board;
//         const newBoard = over.data.current?.board;

//         if (isOverTask) {
//             if (oldBoard !== newBoard && newIndex !== 0) {
//                 setCurrentTasks(tasks => {
//                     const updatedTasks = tasks.map(t => {
//                         if (t.id === activeId) {
//                             return {
//                                 ...activeTask,
//                                 board: newBoard,
//                             };
//                         } else {
//                             return t;
//                         }
//                     });

//                     return arrayMove(updatedTasks, oldIndex, newIndex - 1);
//                 });
//             } else if (oldBoard !== newBoard && newIndex === 0) {
//                 setCurrentTasks(tasks => {
//                     const updatedTasks = tasks.map(t => {
//                         if (t.id === activeId) {
//                             return {
//                                 ...activeTask,
//                                 board: newBoard,
//                             };
//                         } else {
//                             return t;
//                         }
//                     });
//                     return arrayMove(updatedTasks, oldIndex, newIndex);
//                 });
//             } else {
//                 setCurrentTasks(tasks => {
//                     return arrayMove(tasks, oldIndex, newIndex);
//                 });
//             }
//         } else {
//             setCurrentTasks(tasks => {
//                 const updatedTasks = tasks.map(t => {
//                     if (t.id === activeId) {
//                         return {
//                             ...activeTask,
//                             board: overId,
//                         };
//                     } else {
//                         return t;
//                     }
//                 });

//                 return arrayMove(updatedTasks, oldIndex, newIndex);
//             });
//         }
//     };

//     return { handleDragStart, handleDragEnd, handleDragOver };
// };
