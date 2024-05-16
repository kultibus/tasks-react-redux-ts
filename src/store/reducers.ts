import { userReducer } from "./slices/user-slice/userSlice";
import { formReducer } from "./slices/form-slice/formSlice";
import { projectsReducer } from "./slices/projects-slice/projectsSlice";
import { tasksReducer } from "./slices/tasks-slice/tasksSlice";

export const reducers = {
    projectsReducer,
    userReducer,
    tasksReducer,
    formReducer,
};
