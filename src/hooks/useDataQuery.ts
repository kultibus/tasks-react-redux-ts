import { useEffect } from "react";
import {
    setProjectError,
    setProjects,
    setProjectsIsLoading,
} from "../store/slices/projects-slice/projectsSlice";
import { setTasks } from "../store/slices/tasks-slice/tasksSlice";
// import { checkUserAuth } from "../store/slices/user-slice/userActionCreators";
import { IProject } from "../types/models/IProject";
import { ITask } from "../types/models/ITask";
import { useAppDispatch, useAppSelector } from "./redux";

import { child, onValue, ref } from "firebase/database";
import { database } from "../firebase";
import {
    setFormVariant,
    setIsFormOpened,
} from "../store/slices/form-slice/formSlice";
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
                    dispatch(setProjects([]));
                    dispatch(setIsFormOpened(true));
                    dispatch(setFormVariant(IFormVariant.initialProject));
                    return;
                }

				console.log(snap.val())

                dispatch(setProjects(snap.val() as IProject[]));
            }
        );

        return () => {
            projectsDbUnsubscribe();
        };
    }, [dispatch, uid]);
};

export const useTasksDataQuery = () => {
    const { user } = useAppSelector(state => state.userReducer);

    const dispatch = useAppDispatch();

    const uid = user?.uid;

    useEffect(() => {
        if (!uid) return;

        // dispatch(setProjectsIsLoading(true));

        const tasksDbUnsubscribe = onValue(
            ref(database, `${uid}/tasks`),
            snap => {
                if (!snap.exists()) {
                    dispatch(setProjectError("Tasks not found"));
                    return;
                }

                dispatch(setTasks(snap.val() as ITask[]));
            }
        );

        return () => {
            tasksDbUnsubscribe();
        };
    }, [dispatch, uid]);
};
