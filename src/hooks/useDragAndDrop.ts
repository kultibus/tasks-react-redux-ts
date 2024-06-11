import { DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { tasksDatabaseApi } from "../api/api";
import { setActiveTask } from "../store/slices/tasksSlice";
import { useAppDispatch, useAppSelector } from "./redux";
import { board } from "../components/board/Board.module.scss";

export const useDragAndDrop = () => {
    const { tasks, activeTask } = useAppSelector(state => state.tasksReducer);
    const { user } = useAppSelector(state => state.userReducer);
    const { activeProject } = useAppSelector(state => state.projectsReducer);

    const { updateTasks } = tasksDatabaseApi(user, activeProject.id, tasks);

    const dispatch = useAppDispatch();

    const handleDragStart = (event: DragStartEvent) => {
        dispatch(setActiveTask(event.active.data.current.task));
    };

    const handleDragEnd = () => {
        dispatch(setActiveTask(null));
    };

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id as string;
        const overId = over.id as string;

        if (activeId === overId) return;

        const isOverTask = over.data.current?.type === "task";

        const oldIndex = tasks.findIndex(t => t.id === activeId);
        const newIndex = tasks.findIndex(t => t.id === overId);

        const oldBoard = active.data.current?.board;
        const newBoard = over.data.current?.board;

        if (isOverTask) {
            if (oldBoard !== newBoard && newIndex !== 0) {
                const editedTask = {
                    ...activeTask,
                    board: newBoard,
                };

                const reorderedTasks = arrayMove(tasks, oldIndex, newIndex - 1);

                updateTasks(reorderedTasks, editedTask);
            } else if (oldBoard !== newBoard && newIndex === 0) {
                const editedTask = {
                    ...activeTask,
                    board: newBoard,
                };

                const reorderedTasks = arrayMove(tasks, oldIndex, newIndex);

                updateTasks(reorderedTasks, editedTask);
            } else {
                const reorderedTasks = arrayMove(tasks, oldIndex, newIndex);

                updateTasks(reorderedTasks, null);
            }
        } else {
            const editedTask = {
                ...activeTask,
                board: overId,
            };

            const reorderedTasks = arrayMove(tasks, oldIndex, newIndex);

            updateTasks(reorderedTasks, editedTask);
        }
    };

    return { handleDragStart, handleDragEnd, handleDragOver };
};
