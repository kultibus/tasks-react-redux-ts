import {
    DndContext,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
} from "@dnd-kit/core";
import {
    SortableContext,
    arrayMove,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useProjects } from "../../hooks/useProjects";
import { useProjectTasks } from "../../hooks/useTasks";
import {
    editTask,
    updateTasks,
} from "../../store/slices/tasks-slice/tasksActionCreators";
import {
    setActiveTask,
    setTasks,
} from "../../store/slices/tasks-slice/tasksSlice";
import { IFormVariant } from "../../types/models/IForm";
import { FormTask } from "../UI/form-task/FormTask";
import { Board } from "../board/Board";
import { List, ListVariant } from "../list/List";
import { Task } from "../task/Task";
import styles from "./Boards.module.scss";
import { task } from "../task/Task.module.scss";

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

    const dispatch = useAppDispatch();

    const activeProject = useProjects();

    const projectTasks = useProjectTasks(activeProject);

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

                dispatch(updateTasks(updatedTasks));

                return;
            }

            const updatedTasks = arrayMove(tasks, activeIndex, overIndex).map(
                t => {
                    if (t.id === activeId) {
                        return { ...t, board: tasks[overIndex].board };
                    }
                    return t;
                }
            );

            dispatch(updateTasks(updatedTasks));

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

            dispatch(updateTasks(updatedTasks));
        }
    };

    function handleDragStart(event: DragStartEvent) {
        const { active } = event;

        const draggbleTask = projectTasks.find(t => t.id === active.id);

        dispatch(setActiveTask(draggbleTask));
    }

    function handleDragEnd() {
        dispatch(setActiveTask(null));
    }

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
            <DndContext
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
            >
                <List
                    variant={ListVariant.boards}
                    items={boards}
                    renderItem={board => (
                        <SortableContext
                            strategy={verticalListSortingStrategy}
                            key={board}
                            items={projectTasks}
                        >
                            <Board
                                tasks={projectTasks.filter(
                                    t => t.board === board
                                )}
                                board={board}
                            />
                        </SortableContext>
                    )}
                />
                <DragOverlay>
                    {activeTask ? <Task isOverlay task={activeTask} /> : null}
                </DragOverlay>
            </DndContext>
        </main>
    );
};
