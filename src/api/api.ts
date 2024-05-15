import { get, ref, update } from "firebase/database";
import { database } from "../firebase";
import { IProject } from "../models/IProject";
import { IUser } from "../models/IUser";
import {
	IProjectsData,
	IUpdatedData,
} from "../store/slices/projects-slice/projectsActionCreators";

interface LocalStorageAPI {
    setUser: (object: IUser) => void;
    getUser: () => IUser | null;
    setProjects: (object: IProjectsData) => void;
    getProjects: () => IProjectsData | null;
    clear: () => void;
}

export const localStorageApi: LocalStorageAPI = {
    setUser: object => localStorage.setItem("user", JSON.stringify(object)),

    getUser: () => {
        const localUser = localStorage.getItem("user");
        if (!!localUser) return JSON.parse(localUser);
        return null;
    },

    setProjects: object =>
        localStorage.setItem("projects", JSON.stringify(object)),

    getProjects: () => {
        const localProjects = localStorage.getItem("projects");
        if (!!localProjects) return JSON.parse(localProjects);
        return null;
    },

    clear: () => localStorage.clear(),
};

export const projectsApi = {
    async getData(uid: string) {
        const snap = await get(ref(database, `${uid}`));
        return snap.exists()
            ? snap.val()
            : "Something went wrong, try reload page";
    },

    async updateData(data: IUpdatedData) {
        return update(ref(database, `${data.uid}`), data.projectsData);
    },
};
