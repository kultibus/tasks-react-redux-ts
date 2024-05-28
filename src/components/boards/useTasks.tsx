import { useMemo } from "react";
import { useAppSelector } from "../../hooks/redux";
import { IBoardVariant } from "./Boards";

export const useTasks = () => {
    const { openedTasks, inProcessTasks, doneTasks } = useAppSelector(
        state => state.tasksReducer
    );

    const { activeProject } = useAppSelector(state => state.projectsReducer);

    const currentTasks = useMemo(() => {
        const currentOpenedData = openedTasks.find(
            t => t.projectId === activeProject.id
        );
        const currentInProcessData = inProcessTasks.find(
            t => t.projectId === activeProject.id
        );
        const currentDoneData = doneTasks.find(
            t => t.projectId === activeProject.id
        );

        const opened =
            currentOpenedData?.tasks.map(t => ({
                ...t,
                board: IBoardVariant.opened,
            })) || [];
        const inProcess =
            currentInProcessData?.tasks.map(t => ({
                ...t,
                board: IBoardVariant.inProcess,
            })) || [];
        const done =
            currentDoneData?.tasks.map(t => ({
                ...t,
                board: IBoardVariant.done,
            })) || [];

        return [...opened, ...inProcess, ...done];
    }, [openedTasks, inProcessTasks, doneTasks, activeProject]);

    return currentTasks;
};

// export const useTasks = () => {
//     const { openedTasks, inProcessTasks, doneTasks } = useAppSelector(
//         state => state.tasksReducer
//     );

//     const { activeProject } = useAppSelector(state => state.projectsReducer);

//     const currentTasks = useMemo(() => {
//         const currentOpenedData = openedTasks.find(
//             t => t.projectId === activeProject.id
//         );
//         const currentInProcessData = inProcessTasks.find(
//             t => t.projectId === activeProject.id
//         );
//         const currentDoneData = doneTasks.find(
//             t => t.projectId === activeProject.id
//         );

//         return {
//             opened: currentOpenedData?.tasks || [],
//             inProcess: currentInProcessData?.tasks || [],
//             done: currentDoneData?.tasks || [],
//         };
//     }, [openedTasks, inProcessTasks, doneTasks, activeProject]);

//     return currentTasks;
// };
