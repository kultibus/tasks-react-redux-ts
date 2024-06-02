import { DndContext, DragOverlay } from "@dnd-kit/core";
import { FC, useMemo, useState } from "react";
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
import { IFilter } from "../../types/types";
import { useTasks } from "../../hooks/useTasks";

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

    const [filter, setFilter] = useState<IFilter>({ sort: "", query: "" });

    const activeProject = useActiveProject();

    const projectTasks = useMemo(() => {
        return tasks.filter(t => t.projectId === activeProject.id);
    }, [tasks, activeProject]);

    const filteredTasks = useTasks(projectTasks, filter);

    const { handleDragStart, handleDragEnd, handleDragOver } = useDragAndDrop();

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
                <TasksFilter filter={filter} setFilter={setFilter} />
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
                                // tasks={projectTasks.filter(
                                tasks={filteredTasks.filter(
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
