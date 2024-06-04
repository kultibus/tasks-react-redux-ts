import { userReducer } from "./slices/user-slice/userSlice";
import { formReducer } from "./slices/formSlice";
import { projectsReducer } from "./slices/projectsSlice";
import { tasksReducer } from "./slices/tasksSlice";
import { themeReducer, themeSlice } from "./slices/theme-slice/themeSlice";

export const reducers = {
    projectsReducer,
    userReducer,
    tasksReducer,
    formReducer,
    themeReducer,
};
