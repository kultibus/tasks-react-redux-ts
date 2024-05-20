import { get, ref, update } from "firebase/database";
import { database } from "../firebase";
import { IUser } from "../types/models/IUser";
import { IProjectsData, ITasksData, IUpdateData } from "../types/types";


interface LocalStorageAPI {
    setUser: (object: IUser) => void;
    getUser: () => IUser | null;
    setProjects: (object: IProjectsData) => void;
    getProjects: () => IProjectsData | null;
    // setTasks: (object: ITasksData) => void;
    // getTasks: () => ITasksData | null;
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

    // setTasks: object => localStorage.setItem("tasks", JSON.stringify(object)),

    // getTasks: () => {
    //     const localTasks = localStorage.getItem("tasks");
    //     if (!!localTasks) return JSON.parse(localTasks);
    //     return null;
    // },

    clear: () => localStorage.clear(),
};

export const databaseApi = {
    async getData(uid: string) {
        const snap = await get(ref(database, `${uid}`));
        return snap.exists()
            ? snap.val()
            : "Something went wrong, try reload page";
    },

    async updateProjects(projectsData: IUpdateData<IProjectsData>) {
        return update(ref(database, `${projectsData.uid}`), projectsData.data);
    },

    async updateTasks(tasksData: IUpdateData<ITasksData>) {
        return update(ref(database, `${tasksData.uid}`), tasksData.data);
    },
};
