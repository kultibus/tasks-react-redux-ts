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
    arrayMove,
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

const boards = [
    IBoardVariant.opened,
    IBoardVariant.inProcess,
    IBoardVariant.done,
];

export const Boards: FC = () => {
    const [currentTasks, setCurrentTasks] = useState<ITask[]>(useTasks());

    const { variant, isOpened } = useAppSelector(state => state.formReducer);

    const [activeTask, setActiveTask] = useState<ITask | null>(null);

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;

        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const activeIndex = currentTasks.findIndex(t => t.id === activeId);
        const overIndex = currentTasks.findIndex(t => t.id === overId);

        console.log(activeIndex, overIndex);
    };

    function handleDragStart(event: DragStartEvent) {
        const { active } = event;

        const activeTask = currentTasks.find(t => t.id === active.id);

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
            {/* <DndContext
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
                            items={currentTasks}
                        >
                            <Board
                                tasks={currentTasks.filter(
                                    t => t.board === board
                                )}
                                board={board}
                                // key={board}
                            />
                        </SortableContext>
                    )}
                />
                <DragOverlay>
                    {activeTask ? <Task isOverlay task={activeTask} /> : null}
                </DragOverlay>
            </DndContext> */}
        </main>
    );
};
