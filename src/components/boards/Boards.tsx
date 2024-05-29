import {
	DndContext,
	DragOverlay
} from "@dnd-kit/core";
import {
	SortableContext,
	verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { FC } from "react";
import { useAppSelector } from "../../hooks/redux";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";
import { useProjects } from "../../hooks/useProjects";
import { useProjectTasks } from "../../hooks/useTasks";
import { IFormVariant } from "../../types/models/IForm";
import { FormTask } from "../UI/form-task/FormTask";
import { Board } from "../board/Board";
import { List, ListVariant } from "../list/List";
import { Task } from "../task/Task";
import styles from "./Boards.module.scss";

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

    const { activeTask } = useAppSelector(state => state.tasksReducer);

    const activeProject = useProjects();

    const projectTasks = useProjectTasks(activeProject);

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
