import { DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { updateTasks } from "../store/slices/tasks-slice/tasksActionCreators";
import { setActiveTask } from "../store/slices/tasks-slice/tasksSlice";
import { useAppDispatch, useAppSelector } from "./redux";
import { useProjects } from "./useProjects";
import { useProjectTasks } from "./useTasks";

export const useDragAndDrop = () => {
    const { tasks } = useAppSelector(state => state.tasksReducer);

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

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;

        const draggbleTask = projectTasks.find(t => t.id === active.id);

        dispatch(setActiveTask(draggbleTask));
    };

    const handleDragEnd = () => {
        dispatch(setActiveTask(null));
    };

    return { handleDragOver, handleDragStart, handleDragEnd };
};
