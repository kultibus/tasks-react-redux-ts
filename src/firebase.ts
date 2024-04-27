import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: process.env.TASKS_API_KEY,
    authDomain: process.env.TASKS_AUTH_DOMAIN,
    projectId: process.env.TASKS_PROJECT_ID,
    storageBucket: process.env.TASKS_STORAGE_BUCKET,
    messagingSenderId: process.env.TASKS_MESSAGING_SENDER_ID,
    appId: process.env.TASKS_APP_ID,
    databaseURL:
        "https://tasks-manager-7a2f5-default-rtdb.europe-west1.firebasedatabase.app",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
