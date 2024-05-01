export enum IFormState {
    initial = "Create new project",
    addProject = "Add new project",
    editProject = "Edit project",
    deleteProject = "Delete project",
    addTask = "Add new task",
    editTask = "Edit task",
    deleteTask = "Delete task",
}

export interface IForm {
    isOpened: boolean;
    state: IFormState;
}
