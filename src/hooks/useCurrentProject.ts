import { useMemo, useState } from "react";
import { IProject } from "../models/IProject";

export const useCurrentProject = (projects: IProject[]) => {
    const currentProject = useMemo(() => {
        if (projects.length) {
            return projects.find(project => project.current);
        } else {
            return null;
        }
    }, [projects]);

    return currentProject;
};
