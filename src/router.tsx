import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";
import { Projects } from "./components/projects/Projects";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { HomePage } from "./pages/HomePage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { FormContainer } from "./components/form-container/FormContainer";
import {
    FormProject,
    FormProjectVariant,
} from "./components/UI/form-project/FormProject";
import { Boards } from "./components/boards/Boards";

export enum RouteNames {
    login = "login",
    register = "register",
    projects = "projects",
    addProject = "add",
    deleteProject = "delete",
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
                                <FormProject variant={FormProjectVariant.add} />
                            </FormContainer>
                        ),
                    },
                    {
                        path: RouteNames.deleteProject,
                        element: (
                            <FormContainer>
                                <FormProject variant={FormProjectVariant.delete} />
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
