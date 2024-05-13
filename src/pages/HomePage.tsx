import { FC, useEffect } from "react";
import {
    LoaderFunctionArgs,
    Navigate,
    useLoaderData,
    useNavigation,
    useParams,
} from "react-router-dom";
import { ProjectLayout } from "../components/project-layout/ProjectLayout";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { IFormVariant } from "../models/IForm";
import {
    setFormVariant,
    setIsFormOpened,
} from "../store/slices/form-slice/formSlice";
import { RouteNames } from "../router";

export const HomePage: FC = () => {
    // const { projects, currentProject } = useAppSelector(
    //     state => state.projectsReducer
    // );

    const route = useLoaderData();
    // const params = useParams();

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (route === "") {
            dispatch(setFormVariant(IFormVariant.initialProject));
            dispatch(setIsFormOpened(true));
        }
    }, [route]);

    return <ProjectLayout />;
    // return !projects.length ? (
    //     <ProjectLayout />
    // ) : (
    //     <Navigate to={`/${RouteNames.project}/${currentProject.id}`} />
    // );
};

export const homePageLoader = ({ request }: LoaderFunctionArgs<any>) => {
    const url = request.url;
    const route = url.slice(url.lastIndexOf("/") + 1);

    return route;
};
