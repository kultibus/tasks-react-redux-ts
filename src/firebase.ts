import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.TASKS_API_KEY,
    authDomain: process.env.TASKS_AUTH_DOMAIN,
    projectId: process.env.TASKS_PROJECT_ID,
    storageBucket: process.env.TASKS_STORAGE_BUCKET,
    messagingSenderId: process.env.TASKS_MESSAGING_SENDER_ID,
    appId: process.env.TASKS_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

