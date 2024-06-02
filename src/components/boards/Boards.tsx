import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { FC, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useActiveProject } from "../../hooks/useActiveProject";
import {
    setActiveTask,
    setTasks,
} from "../../store/slices/tasks-slice/tasksSlice";
import { IFormVariant } from "../../types/models/IForm";
import { ITask } from "../../types/models/ITask";
import { IDataVariant } from "../../types/types";
import { updateDatabase, updateLocalStorage } from "../../utils/updateData";
import { FormTask } from "../UI/form-task/FormTask";
import { Board } from "../board/Board";
import { List, ListVariant } from "../list/List";
import { Task } from "../task/Task";
import styles from "./Boards.module.scss";
import { updateTasks } from "../../store/slices/tasks-slice/tasksActionCreators";

export enum IBoardVariant {
    opened = "opened",
    inProcess = "inProcess",
    done = "done",
}

const boards = [
    IBoardVariant.opened,
    IBoardVariant.inProcess,
    IBoardVariant.done,
];

export const Boards: FC = () => {
    const { variant, isOpened } = useAppSelector(state => state.formReducer);
    const { tasks, activeTask } = useAppSelector(state => state.tasksReducer);
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

    const activeProject = useActiveProject();

    const projectTasks = useMemo(() => {
        return tasks.filter(t => t.projectId === activeProject.id);
    }, [tasks, activeProject]);

    const handleDragStart = (event: DragStartEvent) => {
        dispatch(setActiveTask(event.active.data.current.task));
    };

    const handleDragEnd = (event: DragEndEvent) => {
        dispatch(setActiveTask(null));
        dispatch(setTasks(currentTasks));
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

    if (
        isOpened &&
        (variant === IFormVariant.addTask ||
            variant === IFormVariant.editTask ||
            variant === IFormVariant.deleteTask)
    ) {
        return <FormTask />;
    }

    return (
        <main className={styles.boards}>
            <header className={styles.header}>
                <h3 className={styles.title}>Tasks boards</h3>
                {/* <TasksFilter tasks={projectTasks} /> */}
            </header>
            <div className={styles.content}>
                <DndContext
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
                    // collisionDetection={closestCenter}
                >
                    <List
                        variant={ListVariant.boards}
                        items={boards}
                        renderItem={board => (
                            <Board
                                key={board}
                                tasks={projectTasks.filter(
                                    t => t.board === board
                                )}
                                board={board}
                            />
                        )}
                    />

                    {createPortal(
                        <DragOverlay wrapperElement="ul">
                            {activeTask ? (
                                <Task isOverlay task={activeTask} />
                            ) : null}
                        </DragOverlay>,
                        document.body
                    )}
                </DndContext>
            </div>
        </main>
    );
};
