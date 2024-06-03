import { get, push, ref, set, update } from "firebase/database";
import { database } from "../firebase";
import { IDataVariant, IUpdatedData } from "../types/types";
import { IProject } from "../types/models/IProject";

interface LocalStorageAPI {
    // setLocalData: <T>(object: T, variant: string) => void;
    setLocalData: <T>(object: T, variant: string) => void;
    getLocalData: <T>(variant: string) => T | null;
    clearLocalData: () => void;
}

export const localStorageApi: LocalStorageAPI = {
    setLocalData: (object, variant) =>
        localStorage.setItem(variant, JSON.stringify(object)),

    getLocalData: variant => {
        const localData = localStorage.getItem(variant);
        try {
            return JSON.parse(localData);
        } catch (error) {
            return null;
        }
    },

    clearLocalData: () => {
        const keys = Object.keys(localStorage);

        for (const key of keys) {
            if (key !== "theme") {
                localStorage.removeItem(key);
            }
        }
    },
};

export const databaseApi = {
    async getData(uid: string, path: IDataVariant) {
        const snap = await get(ref(database, `${uid}/${path}`));
        return snap.exists()
            ? snap.val()
            : "Something went wrong, try reload page";
    },

    async updateData<T extends {}>(localData: IUpdatedData<T>) {
        return update(ref(database, `${localData.uid}`), localData.data);
    },

    async addProject(localData) {
        const projectsListRef = ref(database, `${localData.uid}/projects`);

        const newProjectRef = push(projectsListRef);

        await set(newProjectRef, localData.project);

        return newProjectRef.key;
    },
};
