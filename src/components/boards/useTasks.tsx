import { useMemo } from "react";
import { useAppSelector } from "../../hooks/redux";

export const useTasks = () => {
    const { openedTasks, inProcessTasks, doneTasks } = useAppSelector(
        state => state.tasksReducer
    );

	// console.log(openedTasks)

    const { currentProject } = useAppSelector(state => state.projectsReducer);

    const currentTasks = useMemo(() => {
        const currentOpenedData = openedTasks.find(
            t => t.projectId === currentProject.id
        );
        const currentInProcessData = inProcessTasks.find(
            t => t.projectId === currentProject.id
        );
        const currentDoneData = doneTasks.find(
            t => t.projectId === currentProject.id
        );

        return {
            opened: currentOpenedData?.tasks || [],
            inProcess: currentInProcessData?.tasks || [],
            done: currentDoneData?.tasks || [],
        };
    }, [openedTasks, inProcessTasks, doneTasks, currentProject]);

    return currentTasks;
};
