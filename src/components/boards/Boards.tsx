import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    closestCenter,
} from "@dnd-kit/core";
import {
    SortableContext,
    arrayMove,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { FC, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useActiveProject } from "../../hooks/useActiveProject";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";
import { IFormVariant } from "../../types/models/IForm";
import { FormTask } from "../UI/form-task/FormTask";
import { Board } from "../board/Board";
import { List, ListVariant } from "../list/List";
import { Task } from "../task/Task";
import { TasksFilter } from "../tasks-filter/TasksFilter";
import styles from "./Boards.module.scss";
import { defaultTasks } from "./DefaultTasks";
import { ITask } from "../../types/models/ITask";
import {
    setActiveTask,
    setTasks,
} from "../../store/slices/tasks-slice/tasksSlice";
import { testActiveTask } from "../../store/slices/tasks-slice/tasksActionCreators";

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
    // const { tasks, activeTask } = useAppSelector(state => state.tasksReducer);

    const activeProject = useActiveProject();

    const dispatch = useAppDispatch();

    const [currentTasks, setCurrentTasks] = useState<ITask[]>(defaultTasks);
    const [activeTask, setActiveTask] = useState<ITask | null>(null);

    const handleDragStart = (event: DragStartEvent) => {
        if (event.active.data.current?.type === "task") {


			console.log(event.active.data.current.task)
			
            // dispatch(testActiveTask(event.active.data.current.task));
			setActiveTask(event.active.data.current.task);
			
            // return;
        }
    };
	
    const handleDragEnd = () => {
		// dispatch(setActiveTask(null));
        setActiveTask(null);
    };

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        // const isActiveATask = active.data.current?.type === "task";
        const isOverATask = over.data.current?.type === "task";

        // if (!isActiveATask) return;

        // if (isActiveATask && isOverATask) {
        if (isOverATask) {
            setCurrentTasks(tasks => {
                const activeIndex = tasks.findIndex(t => t.id === activeId);
                const overIndex = tasks.findIndex(t => t.id === overId);

                if (tasks[activeIndex].board != tasks[overIndex].board) {
                    tasks[activeIndex].board = tasks[overIndex].board;
                    return arrayMove(tasks, activeIndex, overIndex - 1);
                }

                return arrayMove(tasks, activeIndex, overIndex);
            });
        }

        const isOverAColumn = over.data.current?.type === "board";

        // if (isActiveATask && isOverAColumn) {
        if (isOverAColumn) {
            setCurrentTasks(tasks => {
                const activeIndex = tasks.findIndex(t => t.id === activeId);

                tasks[activeIndex].board = overId as string;
                return arrayMove(tasks, activeIndex, activeIndex);
            });
        }
    };

    // const projectTasks = useMemo(() => {
    //     dispatch(setTasks(currentTasks));
    //     return currentTasks.filter(t => t.projectId === activeProject.id);
    // }, [currentTasks, activeProject]);

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
                    collisionDetection={closestCenter}
                >
                    <SortableContext items={boards}>
                        <List
                            variant={ListVariant.boards}
                            items={boards}
                            renderItem={board => (
                                <Board
                                    key={board}
                                    tasks={currentTasks.filter(
                                        t => t.board === board
                                    )}
                                    board={board}
                                />
                            )}
                        />
                    </SortableContext>

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
