import { databaseApi, localStorageApi } from "../api/api";
import { IProject } from "../types/models/IProject";
import { ITask } from "../types/models/ITask";
import { IUser } from "../types/models/IUser";
import { DataVariant, IProjectsData, ITaskData } from "../types/types";

export function updateDatabase(
    user: IUser,
    updatedData: IProject[] | ITask[],
    variant: DataVariant
) {
    if (!user) return;

    switch (variant) {
        case DataVariant.projects:
            const projectsData = {
                uid: user.uid,
                data: { [variant]: updatedData as IProject[] },
            };

            databaseApi.updateData<IProjectsData>(projectsData);
            break;

        case DataVariant.tasks:
            const tasksData = {
                uid: user.uid,
                data: { [variant]: updatedData as ITask[] },
            };

            databaseApi.updateData<ITaskData>(tasksData);
            break;
    }
}

export function updateLocalStorage<T>(updatedData: T, variant: DataVariant) {
    switch (variant) {
        case DataVariant.projects:
            localStorageApi.setLocalData<T>(updatedData, DataVariant.projects);

            break;

        case DataVariant.tasks:
            localStorageApi.setLocalData<T>(updatedData, DataVariant.tasks);

            break;
    }
}
