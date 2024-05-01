import { authReducer } from "./slices/auth-slice/authSlice";
import { boardsReducer } from "./slices/boards-slice/boardsSlice";
import { formProjectsReducer } from "./slices/form-projects-slice/formProjectsSlice";
import { projectsReducer } from "./slices/projects-slice/projectsSlice";
import { tasksReducer } from "./slices/tasks-slice/tasksSlice";

export const reducers = {
    projectsReducer,
    authReducer,
    tasksReducer,
    boardsReducer,
    formProjectsReducer,
};
