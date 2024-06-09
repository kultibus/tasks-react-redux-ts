import { push, ref, remove, set, update } from "firebase/database";
import { database } from "../firebase";
import { IProject } from "../types/models/IProject";
import { ITask } from "../types/models/ITask";
import { IUser } from "../types/models/IUser";
import {
    IDataVariant,
    IProjectsData,
    ITaskData,
    IUpdatedData,
} from "../types/types";
import { useAppSelector } from "../hooks/redux";

export const projectsDatabaseApi = () => {
    const { user } = useAppSelector(state => state.userReducer);

    const addProject = (project: IProject) => {
        const projectsRef = ref(database, `${user.uid}/projects`);

        const newProjectKey = push(projectsRef).key;

        const updates = {
            [newProjectKey]: project,
            activeKey: newProjectKey,
        };

        update(projectsRef, updates);
    };

    const editProject = (project: IProject) => {
        const projectsRef = ref(database, `${user.uid}/projects`);

        const updates = {
            [project.id]: project,
            activeKey: project.id,
        };

        update(projectsRef, updates);
    };

    const deleteProject = (project: IProject) => {
        const projectsRef = ref(database, `${user.uid}/projects/${project.id}`);

        remove(projectsRef);
    };

    const updateActiveKey = (project: IProject) => {
        const activeKeyRef = ref(database, `${user.uid}/projects/activeKey`);

        if (!!project.id) {
            set(activeKeyRef, project.id);
        } else {
            remove(activeKeyRef);
        }
    };

    return { addProject, editProject, deleteProject, updateActiveKey };
};

const updateData = <T extends {}>(localData: IUpdatedData<T>) => {
    return update(ref(database, `${localData.uid}`), localData.data);
};

export function updateDatabase(
    user: IUser,
    updatedData: IProject[] | ITask[],
    variant: IDataVariant
) {
    if (!user) return;

    switch (variant) {
        case IDataVariant.projects:
            const projectsData = {
                uid: user.uid,
                data: { [variant]: updatedData as IProject[] },
            };

            updateData<IProjectsData>(projectsData);
            break;

        case IDataVariant.tasks:
            const tasksData = {
                uid: user.uid,
                data: { [variant]: updatedData as ITask[] },
            };

            updateData<ITaskData>(tasksData);
            break;
    }
}
