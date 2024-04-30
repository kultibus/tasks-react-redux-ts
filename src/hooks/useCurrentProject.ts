import { useMemo, useState } from "react";
import { IProject } from "../models/IProject";

export const useCurrentProject = (projects: IProject[]) => {
    const [currentProject, setCurrentProject] = useState<IProject>(
        {} as IProject
    );

    useMemo(() => {
        if (projects.length) {
            setCurrentProject(projects.find(project => project.current));
        }
    }, [projects]);
    return currentProject;
};
