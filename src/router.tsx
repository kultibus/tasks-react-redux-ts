import {
    LoaderFunctionArgs,
    createBrowserRouter,
    redirect,
} from "react-router-dom";
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
import { NotFound } from "./components/not-found/NotFound";

export enum RouteNames {
    login = "login",
    register = "register",
    projects = "projects",
    addProject = "add",
    deleteProject = "delete",
    editProject = "edit",
    root = "/",
}

// export const router = createBrowserRouter([
//     {
//         path: RouteNames.home,
//         element: <App />,
//         errorElement: <App />,
//         children: [
//             {
//                 index: true,
//                 element: (
//                     <ProtectedRoute>
//                         <HomePage />
//                     </ProtectedRoute>
//                 ),
//             },

//             {
//                 path: `${RouteNames.projects}/:projectId`,
//                 element: (
//                     <ProtectedRoute>
//                         <ProjectsPage />
//                     </ProtectedRoute>
//                 ),
//                 children: [
//                     {
//                         index: true,
//                         element: <Boards />,
//                     },
//                     {
//                         path: `${RouteNames.projects}/${RouteNames.addProject}`,
//                         element: (
//                             <FormContainer>
//                                 <FormProject />
//                             </FormContainer>
//                         ),
//                     },
//                     {
//                         path: `:projectId/:formVariant`,
//                         element: (
//                             <FormContainer>
//                                 <FormProject />
//                             </FormContainer>
//                         ),
//                     },
//                 ],
//             },
//             {
//                 path: RouteNames.login,
//                 element: (
//                     <PublicRoute>
//                         <LoginPage />
//                     </PublicRoute>
//                 ),
//             },
//             {
//                 path: RouteNames.register,
//                 element: (
//                     <PublicRoute>
//                         <RegisterPage />
//                     </PublicRoute>
//                 ),
//             },
//         ],
//     },
// ]);

const errorLoader = ({ params }: LoaderFunctionArgs<any>) => {
    throw new Response(`Route "${params["*"]}" doesn't exist`, {
        status: 404,
    });
};

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                errorElement: <NotFound />,
                children: [
                    {
                        index: true,
                        loader: () => {
                            return redirect(RouteNames.projects);
                        },
                    },
                    {
                        path: "*",
                        element: <div></div>,
                        loader: errorLoader,
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
                    {
                        path: RouteNames.projects,
                        element: (
                            <ProtectedRoute>
                                <ProjectsPage />
                            </ProtectedRoute>
                        ),
                        children: [
                            {
                                errorElement: <NotFound />,
                                children: [
                                    {
                                        index: true,
                                        element: (
                                            <FormContainer>
                                                <FormProject />
                                            </FormContainer>
                                        ),
                                    },
                                    {
                                        path: ":id",
                                        element: <Boards />,
                                    },
                                ],
                            },
                        ],
                    },
                    // {
                    // 	path: `${RouteNames.projects}/:projectId`,
                    // 	element: (
                    // 		<ProtectedRoute>
                    // 			<ProjectsPage />
                    // 		</ProtectedRoute>
                    // 	),
                    // 	children: [
                    // 		{
                    // 			index: true,
                    // 			element: <Boards />,
                    // 		},
                    // 		{
                    // 			path: `${RouteNames.projects}/${RouteNames.addProject}`,
                    // 			element: (
                    // 				<FormContainer>
                    // 					<FormProject />
                    // 				</FormContainer>
                    // 			),
                    // 		},
                    // 		{
                    // 			path: `:projectId/:formVariant`,
                    // 			element: (
                    // 				<FormContainer>
                    // 					<FormProject />
                    // 				</FormContainer>
                    // 			),
                    // 		},
                    // 	],
                    // },
                    // {
                    // 	path: RouteNames.login,
                    // 	element: (
                    // 		<PublicRoute>
                    // 			<LoginPage />
                    // 		</PublicRoute>
                    // 	),
                    // },
                    // {
                    // 	path: RouteNames.register,
                    // 	element: (
                    // 		<PublicRoute>
                    // 			<RegisterPage />
                    // 		</PublicRoute>
                    // 	),
                    // },
                ],
            },
        ],
    },
]);
