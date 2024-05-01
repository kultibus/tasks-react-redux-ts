import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { ProtectedRoute } from "./components/routes/ProtectedRoute";
import { PublicRoute } from "./components/routes/PublicRoute";
import { FormProject } from "./components/UI/form-project/FormProject";
import { Boards } from "./components/boards/Boards";
import { FormContainer } from "./components/form-container/FormContainer";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { RegisterPage } from "./pages/RegisterPage";

export enum RouteNames {
    login = "login",
    register = "register",
    projects = "projects",
    addProject = "add",
    deleteProject = "delete",
    editProject = "edit",
    home = "/",
}

export const router = createBrowserRouter([
    {
        path: RouteNames.home,
        element: <App />,
        errorElement: <App />,
        children: [
            {
                index: true,
                element: (
                    <ProtectedRoute>
                        <HomePage />
                    </ProtectedRoute>
                ),
            },
            {
                path: `${RouteNames.projects}`,
                element: (
                    <ProtectedRoute>
                        <ProjectsPage />
                    </ProtectedRoute>
                ),
                children: [
                    {
                        path: ":projectId",
                        element: <Boards />,
                    },
                    {
                        path: RouteNames.addProject,
                        element: (
                            <FormContainer>
                                <FormProject />
                            </FormContainer>
                        ),
                    },
                    {
                        path: `:projectId/:formState`,
                        element: (
                            <FormContainer>
                                <FormProject />
                            </FormContainer>
                        ),
                    },
                ],
            },
            {
                path: RouteNames.login,
                element: (
                    <PublicRoute>
                        <LoginPage />
                    </PublicRoute>
                ),
            },
            {
                path: RouteNames.register,
                element: (
                    <PublicRoute>
                        <RegisterPage />
                    </PublicRoute>
                ),
            },
        ],
    },
]);
