import { authReducer } from "./slices/auth-slice/authSlice";
import { projectsReducer } from "./slices/projects-slice/projectsSlice";
import { tasksReducer } from "./slices/tasks-slice/tasksSlice";

export const reducers = {
    projectsReducer,
    authReducer,
    tasksReducer,
};
