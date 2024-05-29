import { get, ref, update } from "firebase/database";
import { database } from "../firebase";
import { IDataVariant, IUpdatedData } from "../types/types";

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
};
