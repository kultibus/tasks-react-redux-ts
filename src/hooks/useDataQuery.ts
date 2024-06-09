import { useEffect } from "react";
import {
    setActiveProject,
    setProjects,
    setProjectsIsLoading,
} from "../store/slices/projectsSlice";
import { setActiveTask, setTasks } from "../store/slices/tasksSlice";
import { IProject } from "../types/models/IProject";
import { ITask } from "../types/models/ITask";
import { useAppDispatch, useAppSelector } from "./redux";

import { onValue, ref } from "firebase/database";
import { database } from "../firebase";
import { setFormVariant, setIsFormOpened } from "../store/slices/formSlice";
import { IFormVariant } from "../types/models/IForm";

export const useProjectsDataQuery = () => {
    const { user } = useAppSelector(state => state.userReducer);

    const dispatch = useAppDispatch();

    const uid = user?.uid;

    useEffect(() => {
        if (!uid) return;

        dispatch(setProjectsIsLoading(true));

        const projectsDbUnsubscribe = onValue(
            ref(database, `${uid}/projects`),

            snap => {
                if (!snap.exists()) {
                    // dispatch(setProjects([]));
                    dispatch(setProjectsIsLoading(false));
                    dispatch(setIsFormOpened(true));
                    dispatch(setFormVariant(IFormVariant.initialProject));
                    return;
                }

                const projects: IProject[] = [];
                let activeKey = "";

                snap.forEach(child => {
                    if (child.key !== "activeKey") {
                        const project: IProject = {
                            ...child.val(),
                            id: child.key,
                        };

                        projects.push(project);
                    } else {
                        activeKey = child.val();
                    }
                });

                const activeProject = projects.find(p => p.id === activeKey);

                dispatch(setProjects(projects));
                dispatch(setActiveProject(activeProject));
            }
        );

        return () => {
            projectsDbUnsubscribe();
        };
    }, [dispatch, uid]);
};

export const useTasksDataQuery = () => {
    const { user } = useAppSelector(state => state.userReducer);
    const { activeProject } = useAppSelector(state => state.projectsReducer);

    const dispatch = useAppDispatch();

    const uid = user?.uid;
    const projectId = activeProject?.id;

    useEffect(() => {
        if (!uid || !projectId) return;

        // dispatch(setProjectsIsLoading(true));

        const tasksDbUnsubscribe = onValue(
            ref(database, `${uid}/tasks/${projectId}`),
            snap => {
                if (!snap.exists()) {
                    // dispatch(setProjectError("Tasks not found"));
                    return;
                }

                const tasks: ITask[] = [];

                snap.forEach(child => {
                    const task: ITask = {
                        ...child.val(),
                        id: child.key,
                    };

                    tasks.push(task);
                });

                dispatch(setTasks(tasks));
            }
        );

        return () => {
            tasksDbUnsubscribe();
        };
    }, [dispatch, uid, projectId]);
};
