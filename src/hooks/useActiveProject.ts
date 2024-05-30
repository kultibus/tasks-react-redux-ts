import { useMemo } from "react";
import { useAppSelector } from "./redux";

export const useActiveProject = () => {
    const { projects } = useAppSelector(state => state.projectsReducer);

    const activeProject = useMemo(() => {
        return projects.find(p => p.isActive);
    }, [projects]);

    return activeProject;
};
