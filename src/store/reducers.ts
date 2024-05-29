import { userReducer } from "./slices/user-slice/userSlice";
import { formReducer } from "./slices/form-slice/formSlice";
import { projectsReducer } from "./slices/projects-slice/projectsSlice";
import { tasksReducer } from "./slices/tasks-slice/tasksSlice";
import { themeReducer, themeSlice } from "./slices/theme-slice/themeSlice";

export const reducers = {
    projectsReducer,
    userReducer,
    tasksReducer,
    formReducer,
    themeReducer,
};
