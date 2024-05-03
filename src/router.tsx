import {
    LoaderFunctionArgs,
    createBrowserRouter,
    json,
    redirect,
} from "react-router-dom";
import { App } from "./App";
import { ProtectedRoutes } from "./components/routes/ProtectedRoutes";
import { PublicRoutes } from "./components/routes/PublicRoutes";
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
//                     <ProtectedRoutes>
//                         <HomePage />
//                     </ProtectedRoutes>
//                 ),
//             },

//             {
//                 path: `${RouteNames.projects}/:projectId`,
//                 element: (
//                     <ProtectedRoutes>
//                         <ProjectsPage />
//                     </ProtectedRoutes>
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
//                     <PublicRoutes>
//                         <LoginPage />
//                     </PublicRoutes>
//                 ),
//             },
//             {
//                 path: RouteNames.register,
//                 element: (
//                     <PublicRoutes>
//                         <RegisterPage />
//                     </PublicRoutes>
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
                        path: "*",
                        loader: ({ params }) => {
                            throw json(`Route "${params["*"]}" doesn't exist`, {
                                status: 404,
                            });
                        },
                    },
                    {
                        element: <PublicRoutes />,
                        children: [
                            {
                                path: RouteNames.login,
                                element: <LoginPage />,
                            },
                            {
                                path: RouteNames.register,
                                element: <RegisterPage />,
                            },
                        ],
                    },
                    {
                        element: <ProtectedRoutes />,
                        children: [
                            {
                                index: true,
                                loader: () => {
                                    return redirect(RouteNames.projects);
                                },
                            },
                            {
                                path: RouteNames.projects,
                                element: <ProjectsPage />,
                                children: [
									{
										index: true,
										element: <FormProject />,
									},
									{
										path: "boards",
										element: <Boards />,
									},
                                    // {
                                    //     errorElement: <NotFound />,
                                    //     children: [
                                    //     ],
                                    // },
                                ],
                            },
                        ],
                    },
                    // {
                    //     path: RouteNames.projects,

                    //     element: (
                    //         <ProtectedRoutes>
                    //             <ProjectsPage />
                    //         </ProtectedRoutes>
                    //     ),
                    //     children: [
                    //         {
                    //             errorElement: <NotFound />,
                    //             children: [
                    //                 // {
                    //                 //     index: true,
                    //                 //     element: <FormProject />,
                    //                 // },
                    //                 {
                    //                     path: "*",
                    //                     loader: ({ params }) => {
                    //                         throw json(
                    //                             `Route "${params["*"]}" doesn't exist`,
                    //                             {
                    //                                 status: 404,
                    //                             }
                    //                         );
                    //                     },
                    //                 },
                    //             ],
                    //         },
                    //     ],
                    // },
                    // {
                    // 	path: `${RouteNames.projects}/:projectId`,
                    // 	element: (
                    // 		<ProtectedRoutes>
                    // 			<ProjectsPage />
                    // 		</ProtectedRoutes>
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
                    // 		<PublicRoutes>
                    // 			<LoginPage />
                    // 		</PublicRoutes>
                    // 	),
                    // },
                    // {
                    // 	path: RouteNames.register,
                    // 	element: (
                    // 		<PublicRoutes>
                    // 			<RegisterPage />
                    // 		</PublicRoutes>
                    // 	),
                    // },
                ],
            },
        ],
    },
]);
