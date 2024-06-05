import { ref, update } from "firebase/database";
import { database } from "../firebase";
import {
    IDataVariant,
    IProjectsData,
    ITaskData,
    IUpdatedData,
} from "../types/types";
import { IUser } from "../types/models/IUser";
import { IProject } from "../types/models/IProject";
import { ITask } from "../types/models/ITask";

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
