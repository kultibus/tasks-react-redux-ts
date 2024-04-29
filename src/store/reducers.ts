import { authReducer } from "./slices/auth-slice/authSlice";
import { projectFormReducer } from "./slices/project-form-slice/projectFormSlice";
import { projectsReducer } from "./slices/projects-slice/projectsSlice";

export const reducers = {
    projectsReducer,
    authReducer,
	projectFormReducer
};
