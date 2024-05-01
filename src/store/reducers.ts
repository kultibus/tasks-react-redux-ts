import { userReducer } from "./slices/user-slice/userSlice";
import { boardsReducer } from "./slices/boards-slice/boardsSlice";
import { formReducer } from "./slices/form-slice/formSlice";
import { projectsReducer } from "./slices/projects-slice/projectsSlice";
import { tasksReducer } from "./slices/tasks-slice/tasksSlice";

export const reducers = {
    projectsReducer,
    userReducer,
    tasksReducer,
    boardsReducer,
    formReducer,
};
