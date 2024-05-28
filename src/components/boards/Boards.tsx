import {
    DndContext,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
} from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { IFormVariant } from "../../types/models/IForm";
import { ITask } from "../../types/models/ITask";
import { FormTask } from "../UI/form-task/FormTask";
import { Board } from "../board/Board";
import { List, ListVariant } from "../list/List";
import { Task } from "../task/Task";
import styles from "./Boards.module.scss";
import { useActiveTask, useProjectTasks } from "./useTasks";
import { useProjects } from "../../hooks/useProjects";
import { updateActiveTask } from "../../store/slices/tasks-slice/tasksActionCreators";

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

    const dispatch = useAppDispatch();

    const activeProject = useProjects();

    const projectTasks = useProjectTasks(activeProject);

    const activeTask = useActiveTask();

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;

        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        // const activeIndex = currentTasks.findIndex(t => t.id === activeId);
        // const overIndex = currentTasks.findIndex(t => t.id === overId);
    };

    function handleDragStart(event: DragStartEvent) {
        const { active } = event;

        const draggbleTask = projectTasks.find(t => t.id === active.id);

        dispatch(updateActiveTask(draggbleTask));
    }

    function handleDragEnd() {
        dispatch(updateActiveTask(null));
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
