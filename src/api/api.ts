import { get, ref, update } from "firebase/database";
import { database } from "../firebase";
import { IUpdateData } from "../types/types";

export enum LocalDataVariant {
    user = "user",
    projects = "projects",
    tasks = "tasks",
}

interface LocalStorageAPI {
    setLocalData: <T>(object: T, variant: LocalDataVariant) => void;
    getLocalData: <T>(variant: LocalDataVariant) => T | null;
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
    async getData(uid: string) {
        const snap = await get(ref(database, `${uid}`));
        return snap.exists()
            ? snap.val()
            : "Something went wrong, try reload page";
    },

    async updateData<T extends {}>(localData: IUpdateData<T>) {
        return update(ref(database, `${localData.uid}`), localData.data);
    },
};
