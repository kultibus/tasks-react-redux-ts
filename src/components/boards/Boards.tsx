import {
    DndContext,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    MouseSensor,
    PointerSensor,
    closestCenter,
    closestCorners,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { FC, useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import { IFormVariant } from "../../types/models/IForm";
import { FormTask } from "../UI/form-task/FormTask";
import { Board } from "../board/Board";
import { List, ListVariant } from "../list/List";
import styles from "./Boards.module.scss";
import { useTasks } from "./useTasks";
import {
    SortableContext,
    rectSwappingStrategy,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Task } from "../task/Task";
import { board } from "../board/Board.module.scss";
import { ITask } from "../../types/models/ITask";

export enum IBoardVariant {
    opened = "opened",
    inProcess = "inProcess",
    done = "done",
}

export const Boards: FC = () => {
    const boards = [
        IBoardVariant.opened,
        IBoardVariant.inProcess,
        IBoardVariant.done,
    ];

    const currentTasks = useTasks();

    const { variant, isOpened } = useAppSelector(state => state.formReducer);

    const [activeTask, setActiveTask] = useState<ITask | null>(null);

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;

        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        console.log(activeId, overId);
    };

    function handleDragStart(event: DragStartEvent) {
        const id = event.active.id;

        const activeTask = [
            ...currentTasks.opened,
            ...currentTasks.inProcess,
            ...currentTasks.done,
        ].find(t => t.id === id);

        setActiveTask(activeTask);
    }

    function handleDragEnd() {
        setActiveTask(null);
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
                // collisionDetection={ closestCorners }
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
                            items={currentTasks[board]}
                        >
                            <Board
                                tasks={currentTasks[board]}
                                board={board}
                                // key={board}
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
