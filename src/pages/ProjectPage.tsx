import { FC, useEffect } from "react";
import { Navigate, Outlet, useNavigation } from "react-router-dom";
import { MainLoader } from "../components/main-loader/MainLoader";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setIsFormOpened } from "../store/slices/form-slice/formSlice";
import { checkProjects } from "../store/slices/projects-slice/projectsActionCreators";

export const ProjectPage: FC = () => {
    const { projects } = useAppSelector(state => state.projectsReducer);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkProjects());

        dispatch(setIsFormOpened(false));
    }, []);

    return projects.length ? <Outlet /> : <Navigate to={`/`} />;
};
