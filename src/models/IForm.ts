export enum IFormVariant {
    initial = "Create new project",
    addProject = "Add new project",
    editProject = "Edit project",
    deleteProject = "Delete project",
    addTask = "Add new task",
    editTask = "Edit task",
    deleteTask = "Delete task",
    signUp = "Sign up",
    signIn = "Sign In",
    loading = "Loading...",
}

export interface IForm {
    isOpened?: boolean;
    isValid?: boolean;
    variant?: IFormVariant;
}
