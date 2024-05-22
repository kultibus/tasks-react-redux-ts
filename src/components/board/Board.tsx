import { FC, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { List, ListVariant } from "../list/List";
import { Task } from "../task/Task";
import styles from "./Board.module.scss";
import { ITask, ITaskState } from "../../types/models/ITask";
import { task } from "../task/Task.module.scss";
import {
    DndContext,
    DragOverlay,
    DragStartEvent,
    UniqueIdentifier,
    useDroppable,
} from "@dnd-kit/core";
import { Draggable } from "../drag-n-drop/Draggble";
import { setTaskIsDragging } from "../../store/slices/tasks-slice/tasksSlice";

interface BoardProps {
    boardName: ITaskState;
}

export const Board: FC<BoardProps> = props => {
    const { boardName } = props;

    const { tasks } = useAppSelector(state => state.tasksReducer);
    const { currentProject } = useAppSelector(state => state.projectsReducer);

    const dispatch = useAppDispatch();

    const boardTasks = useMemo(() => {
        if (tasks) {
            return tasks
                .filter(task => task.projectId === currentProject.id)
                .filter(task => task.state === boardName);
        }
        return [];
    }, [currentProject, tasks, boardName]);

    const [activeId, setActiveId] = useState<UniqueIdentifier>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id);

        setIsDragging(true);
        // dispatch(setTaskIsDragging(true));
    };
    const handleDragEnd = () => {
        setActiveId(null);

        setIsDragging(false);
        // dispatch(setTaskIsDragging(false));
    };

    return (
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <li className={styles.board}>
                <header className={styles.header}>
                    <h2>Tasks {boardName}</h2>
                    <div className={styles.tasksQuantity}>
                        {boardTasks.length}
                    </div>
                </header>
                <section className={styles.tasks}>
                    <List
                        variant={ListVariant.tasks}
                        items={boardTasks}
                        renderItem={task => (
                            <Draggable childrenId={task.id} key={task.id}>
                                <Task task={task} />
                            </Draggable>
                        )}
                    />

                    <DragOverlay transition={"all 1s ease"}  >
                        {activeId ? (
                            <Task
                                isDragging={isDragging}
                                task={tasks.find(task => task.id === activeId)}
                            />
                        ) : null}
                    </DragOverlay>
                </section>
            </li>
        </DndContext>
    );
};
