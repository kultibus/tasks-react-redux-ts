import { databaseApi, localStorageApi } from "../api/api";
import { IProject } from "../types/models/IProject";
import { ITask } from "../types/models/ITask";
import { IUser } from "../types/models/IUser";
import { IDataVariant, IProjectsData, ITaskData } from "../types/types";

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

            databaseApi.updateData<IProjectsData>(projectsData);
            break;

        case IDataVariant.tasks:
            const tasksData = {
                uid: user.uid,
                data: { [variant]: updatedData as ITask[] },
            };

            databaseApi.updateData<ITaskData>(tasksData);
            break;
    }
}

export function updateLocalStorage<T>(updatedData: T, variant: IDataVariant) {
    switch (variant) {
        case IDataVariant.projects:
            localStorageApi.setLocalData<T>(updatedData, IDataVariant.projects);

            break;

        case IDataVariant.tasks:
            localStorageApi.setLocalData<T>(updatedData, IDataVariant.tasks);

            break;

        case IDataVariant.theme:
            localStorageApi.setLocalData<T>(updatedData, IDataVariant.theme);

            break;
    }
}
