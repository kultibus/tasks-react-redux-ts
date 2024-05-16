import { FC, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setIsFormOpened } from "../store/slices/form-slice/formSlice";

export const ProjectPage: FC = () => {
    const { projects } = useAppSelector(state => state.projectsReducer);

    const isProjects = projects?.length;

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setIsFormOpened(false));
    }, [dispatch]);

    return isProjects ? <Outlet /> : <Navigate to={`/`} />;
};
