import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { FC, useMemo } from "react";
import { createPortal } from "react-dom";
import { useAppSelector } from "../../hooks/redux";
import { useActiveProject } from "../../hooks/useActiveProject";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";
import { IFormVariant } from "../../types/models/IForm";
import { FormTask } from "../UI/form-task/FormTask";
import { Board } from "../board/Board";
import { List, ListVariant } from "../list/List";
import { Task } from "../task/Task";
import { TasksFilter } from "../tasks-filter/TasksFilter";
import styles from "./Boards.module.scss";
import { useProjectTasks } from "../../hooks/useProjectTasks";

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
    const { tasks } = useAppSelector(state => state.tasksReducer);

    const { activeTask } = useAppSelector(state => state.tasksReducer);
    const projectTasks = useProjectTasks();

    const { handleDragEnd, handleDragOver, handleDragStart } = useDragAndDrop();

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
                <TasksFilter />
            </header>
            <div className={styles.content}>
                <DndContext
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
                    collisionDetection={closestCenter}
                >
                    <List
                        variant={ListVariant.boards}
                        items={boards}
                        renderItem={board => (
                            <SortableContext
                                strategy={verticalListSortingStrategy}
                                items={tasks}
                                key={board}
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

                    {createPortal(
                        <DragOverlay>
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
