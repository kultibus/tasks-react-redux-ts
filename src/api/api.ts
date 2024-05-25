import { get, ref, update } from "firebase/database";
import { database } from "../firebase";
import { IUpdateData } from "../types/types";

export enum DataVariant {
    user = "userData",
    projects = "projectsData",
    tasks = "tasksData",
}

interface LocalStorageAPI {
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

    clearLocalData: () => localStorage.clear(),
};

export const databaseApi = {
    async getData(uid: string, path: DataVariant) {
        const snap = await get(ref(database, `${uid}/${path}`));
        return snap.exists()
            ? snap.val()
            : "Something went wrong, try reload page";
    },

    async updateData<T extends {}>(localData: IUpdateData<T>) {
        return update(
            ref(database, `${localData.uid}/${localData.path}`),
            localData.data
        );
    },
};
